export const columns = [
    {
      title: "Country",
      dataIndex: "country",
      key: "country"
    },
    {
      title: "Deaths",
      dataIndex: "deaths",
      key: "deaths",
      sorter: (a, b) => a.deaths - b.deaths,
      sortDirections: ['descend', 'ascend']
    }, 
    {
      title: "Deaths per 1000",
      dataIndex: "deathsPerThousand",
      key: "deathsPerThousand",
      sorter: (a, b) => a.deathsPerThousand - b.deathsPerThousand,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: "Population",
      dataIndex: "population",
      key: "population",
      sorter: (a, b) => a.population - b.population,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: "Date updated",
      dataIndex: "updated",
      key: "updated",
    }
  ];
