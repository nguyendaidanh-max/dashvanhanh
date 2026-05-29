import pandas as pd
import json
import math

def clean_float(val):
    if pd.isna(val) or math.isnan(val) or math.isinf(val):
        return 0
    return float(val)

def main():
    file_path = r'c:\Users\win\Desktop\AI Học\Data Vận hành\Data Vận hành.xlsx'
    out_json = r'c:\Users\win\Desktop\AI Học\Dashboard\data.json'

    data = {
        "overview": {
            "gtc": {"volume": 0, "rate": 0},
            "ltc": {"volume": 0, "rate": 0}
        },
        "top_weak_hubs": [],
        "gtc_by_hub": [],
        "ltc_by_hub": []
    }

    try:
        # Read Data GTC
        df_gtc = pd.read_excel(file_path, sheet_name='Data GTC')
        # Overview GTC (Summing up or getting grand total. Usually the first row or summing column)
        # Let's take the first 10 rows for GTC by hub
        for i in range(min(10, len(df_gtc))):
            hub_name = str(df_gtc.iloc[i].get('Unnamed: 0', ''))
            if "Total" in hub_name or hub_name == "nan": continue
            data["gtc_by_hub"].append({
                "hub": hub_name,
                "volume": clean_float(df_gtc.iloc[i].get('Volume', 0)),
                "rate": clean_float(df_gtc.iloc[i].get('% GTC', 0)) * 100
            })
        
        # Calculate roughly overview for GTC
        data["overview"]["gtc"]["volume"] = sum([x["volume"] for x in data["gtc_by_hub"]])
        if len(data["gtc_by_hub"]) > 0:
            data["overview"]["gtc"]["rate"] = sum([x["rate"] for x in data["gtc_by_hub"]]) / len(data["gtc_by_hub"])

        # Read Data LTC
        df_ltc = pd.read_excel(file_path, sheet_name='Data LTC')
        for i in range(min(11, len(df_ltc))):
            hub_name = str(df_ltc.iloc[i].get('Note', ''))
            manager = str(df_ltc.iloc[i].get('Cấp quản lý', ''))
            if "Grand Total" in manager:
                data["overview"]["ltc"]["volume"] = clean_float(df_ltc.iloc[i].get('Volume', 0))
                data["overview"]["ltc"]["rate"] = clean_float(df_ltc.iloc[i].get('%LTC', 0)) * 100
                continue
            
            if hub_name != "nan":
                data["ltc_by_hub"].append({
                    "hub": hub_name,
                    "volume": clean_float(df_ltc.iloc[i].get('Volume', 0)),
                    "rate": clean_float(df_ltc.iloc[i].get('%LTC', 0)) * 100
                })

        # Read Top 10 BC yếu nhất
        df_top = pd.read_excel(file_path, sheet_name='Top 10 BC yếu nhất')
        # Row 1 has the actual headers
        df_top.columns = df_top.iloc[1]
        df_top = df_top.drop([0, 1]).reset_index(drop=True)
        
        for i in range(min(10, len(df_top))):
            hub_name = str(df_top.iloc[i].get('Bưu Cục', ''))
            capacity = df_top.iloc[i].get('Capacity tối đa', 0)
            
            if hub_name and hub_name != "nan":
                # Get the last volume column (they have multiple, let's take the first one or a specific one)
                # We see 'Sản lượng' is repeated, let's just get one of them by index if we can, or just take capacity for now
                data["top_weak_hubs"].append({
                    "hub": hub_name,
                    "capacity_diff": clean_float(df_top.iloc[i].iloc[-2]) if len(df_top.iloc[i]) > 2 else 0 # taking one of the last cols for diff
                })

        with open(out_json, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
        print("Data extraction successful!")

    except Exception as e:
        print(f"Error during extraction: {e}")

if __name__ == "__main__":
    main()
