const dashboardData = {
  categories: [
    {
      id: 'cspm',
      name: 'CSPM Executive Dashboard',
      widgets: [
        {
          id: 'cloud-accounts',
          name: 'Cloud Accounts',
          text: 'Total: 2 cloud accounts are currently being monitored.',
          type: 'doughnut',
          chartData: {
            labels: ['Connected', 'Not Connected'],
            datasets: [{
              data: [2, 2],
              backgroundColor: ['#4285f4', '#db4437'],
              borderWidth: 0
            }]
          }
        },
        {
          id: 'cloud-risk',
          name: 'Cloud Account Risk Assessment',
          text: 'Total: 9659 assessments completed',
          type: 'doughnut',
          chartData: {
            labels: ['Failed', 'Warning', 'Not Available', 'Passed'],
            datasets: [{
              data: [1689, 681, 36, 7253],
              backgroundColor: ['#db4437', '#ff9800', '#9e9e9e', '#0f9d58'],
              borderWidth: 0
            }]
          }
        }
      ]
    },
    {
      id: 'cwpp',
      name: 'CWPP Dashboard',
      widgets: [
        {
          id: 'top5-alerts',
          name: 'Top 5 Namespace Specific Alerts',
          text: 'Latest security alerts from your namespaces',
          type: 'bar',
          chartData: {
            labels: ['kube-system', 'default', 'monitoring', 'logging', 'ingress'],
            datasets: [{
              label: 'Alerts',
              data: [25, 18, 12, 8, 5],
              backgroundColor: '#ff6384',
              borderColor: '#ff6384',
              borderWidth: 1
            }]
          }
        },
        {
          id: 'workload-alerts',
          name: 'Workload Alerts',
          text: 'Critical workload monitoring alerts',
          type: 'line',
          chartData: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
              label: 'Critical Alerts',
              data: [12, 8, 15, 22, 18, 25, 20],
              borderColor: '#ff6384',
              backgroundColor: 'rgba(255, 99, 132, 0.1)',
              tension: 0.4,
              fill: true
            }]
          }
        }
      ]
    },
    {
      id: 'registry',
      name: 'Registry Scan',
      widgets: [
        {
          id: 'image-risk',
          name: 'Image Risk Assessment',
          text: 'Total Vulnerabilities: 1470 across all scanned images',
          type: 'bar',
          chartData: {
            labels: ['Critical', 'High', 'Medium', 'Low', 'Info'],
            datasets: [{
              label: 'Vulnerabilities',
              data: [9, 150, 841, 395, 75],
              backgroundColor: ['#dc3545', '#fd7e14', '#ffc107', '#28a745', '#17a2b8'],
              borderWidth: 1
            }]
          }
        },
        {
          id: 'image-security',
          name: 'Image Security Issues',
          text: 'Total Images: 2 scanned with security issues found',
          type: 'doughnut',
          chartData: {
            labels: ['Critical', 'High', 'Medium', 'Low'],
            datasets: [{
              data: [2, 2, 0, 0],
              backgroundColor: ['#dc3545', '#fd7e14', '#ffc107', '#28a745'],
              borderWidth: 0
            }]
          }
        }
      ]
    }
  ]
};

export default dashboardData;

