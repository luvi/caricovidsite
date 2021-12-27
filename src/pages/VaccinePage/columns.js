export const columns = [
    {
      title: "Country",
      dataIndex: "country",
      key: "country"
    },
    {
      title: "People fully vaccinated",
      dataIndex: "people_fully_vaccinated",
      key: "people_fully_vaccinated",
      sorter: (a, b) => a.people_fully_vaccinated - b.people_fully_vaccinated,
      sortDirections: ['descend', 'ascend']
    }, {
      title: "People vaccinated",
      dataIndex: "people_vaccinated",
      key: "people_vaccinated",
      sorter: (a, b) => a.people_vaccinated - b.people_vaccinated,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: "People fully vaccinated per 100",
      dataIndex: "people_fully_vaccinated_per_hundred",
      key: "people_fully_vaccinated_per_hundred",
      sorter: (a, b) => a.people_fully_vaccinated_per_hundred - b.people_fully_vaccinated_per_hundred,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: "Date updated",
      dataIndex: "date",
      key: "date",
    }
  ];
