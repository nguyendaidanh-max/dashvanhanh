document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch data
        const response = await fetch('tnb_mock_data.json');
        const data = await response.json();
        
        // Update KPIs
        document.getElementById('kpi-gtc-volume').innerText = formatNumber(data.overview.gtc.volume);
        document.getElementById('kpi-gtc-rate').innerText = data.overview.gtc.rate.toFixed(1) + '%';
        
        document.getElementById('kpi-ltc-volume').innerText = formatNumber(data.overview.ltc.volume);
        document.getElementById('kpi-ltc-rate').innerText = data.overview.ltc.rate.toFixed(1) + '%';

        // Set global Chart.js defaults
        Chart.defaults.color = '#94a3b8';
        Chart.defaults.font.family = "'Outfit', sans-serif";
        Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(54, 61, 75, 0.9)';
        Chart.defaults.plugins.tooltip.padding = 12;
        Chart.defaults.plugins.tooltip.cornerRadius = 8;
        Chart.defaults.plugins.tooltip.borderColor = 'rgba(255,255,255,0.1)';
        Chart.defaults.plugins.tooltip.borderWidth = 1;

        // 0. Productivity vs GTC Rate Chart (Mixed)
        const prodGtcCtx = document.getElementById('productivityGtcChart').getContext('2d');
        const prodData = data.gtc_by_hub.slice(0, 8); // top 8 hubs
        
        new Chart(prodGtcCtx, {
            type: 'bar',
            data: {
                labels: prodData.map(d => d.hub.replace('Bưu Cục ', 'BC ')),
                datasets: [
                    {
                        label: 'Năng suất (Volume)',
                        data: prodData.map(d => d.volume),
                        backgroundColor: 'rgba(59, 130, 246, 0.8)', // Blue accent
                        borderRadius: 4,
                        order: 2,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Tỷ lệ GTC (%)',
                        data: prodData.map(d => d.rate),
                        type: 'line',
                        borderColor: '#f59e0b', // Amber accent
                        backgroundColor: '#f59e0b',
                        borderWidth: 2,
                        pointBackgroundColor: '#1e293b',
                        pointBorderColor: '#f59e0b',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        tension: 0.3,
                        order: 1,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                layout: { padding: { bottom: 25 } },
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                plugins: {
                    legend: { position: 'top', labels: { usePointStyle: true, color: '#f8fafc' } }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { maxRotation: 45, minRotation: 45 }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: { display: true, text: 'Volume (Đơn)', color: '#94a3b8' },
                        grid: { color: 'rgba(255, 255, 255, 0.05)' }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: { display: true, text: 'Tỷ lệ GTC (%)', color: '#94a3b8' },
                        grid: { drawOnChartArea: false },
                        min: 0,
                        max: 100
                    }
                }
            }
        });

        // 1. Weak Hubs Chart (Capacity Diff)
        const weakHubsCtx = document.getElementById('weakHubsChart').getContext('2d');
        const weakHubsData = data.top_weak_hubs.map(item => ({
            hub: item.hub.replace('Bưu Cục ', 'BC '),
            diff: Math.abs(item.capacity_diff) // Show as positive for visual impact
        }));
        
        new Chart(weakHubsCtx, {
            type: 'bar',
            data: {
                labels: weakHubsData.map(d => d.hub),
                datasets: [{
                    label: 'Lượng rủi ro quá tải (Đơn vị)',
                    data: weakHubsData.map(d => d.diff),
                    backgroundColor: 'rgba(239, 68, 68, 0.8)', // Red accent
                    borderRadius: 6,
                    barPercentage: 0.6,
                }]
            },
            options: {
                layout: { padding: { bottom: 25 } },
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255, 255, 255, 0.05)' }
                    },
                    x: {
                        grid: { display: false },
                        ticks: {
                            maxRotation: 45,
                            minRotation: 45
                        }
                    }
                }
            }
        });

        // 2. GTC Chart
        const gtcCtx = document.getElementById('gtcChart').getContext('2d');
        new Chart(gtcCtx, {
            type: 'doughnut',
            data: {
                labels: data.gtc_by_hub.slice(0, 5).map(d => d.hub.replace('Bưu Cục ', 'BC ')),
                datasets: [{
                    data: data.gtc_by_hub.slice(0, 5).map(d => d.rate),
                    backgroundColor: [
                        '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'
                    ],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: { color: '#f8fafc', usePointStyle: true, boxWidth: 8 }
                    }
                },
                cutout: '75%'
            }
        });

        // 3. LTC Chart
        const ltcCtx = document.getElementById('ltcChart').getContext('2d');
        const ltcData = data.ltc_by_hub.slice(0, 5);
        new Chart(ltcCtx, {
            type: 'bar',
            data: {
                labels: ltcData.map(d => d.hub.replace('Bưu Cục ', 'BC ')),
                datasets: [{
                    label: 'Tỷ lệ LTC (%)',
                    data: ltcData.map(d => d.rate),
                    backgroundColor: '#10b981', // Success green
                    borderRadius: 6,
                    barPercentage: 0.5,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y', // Horizontal bar chart
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 100,
                        grid: { color: 'rgba(255, 255, 255, 0.05)' }
                    },
                    y: {
                        grid: { display: false }
                    }
                }
            }
        });

    } catch (error) {
        console.error('Error loading data:', error);
    }
});

function formatNumber(num) {
    return new Intl.NumberFormat('vi-VN').format(Math.round(num));
}
