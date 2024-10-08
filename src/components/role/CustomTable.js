import { Button, Card, Table } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import { deleteRolePermission } from "./roleApis";

const CustomTable = ({ role }) => {
  const [keys, setKeys] = useState([]);
  const [columnsToShow, setColumnsToShow] = useState([]);

  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id"
    },
    {
      id: 2,
      title: "Nom",
      dataIndex: "permission",
      key: "permission",
      render: ({ name } = {}) => name
    },
    {
      id: 3,
      title: "Créé le",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => dayjs(createdAt).format("DD/MM/YYYY")
    },
    {
      id: 4,
      title: "Mis à jour le",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt) => dayjs(updatedAt).format("DD/MM/YYYY")
    }
  ];

  useEffect(() => {
    setColumnsToShow(columns);
  }, []);

  const columnsToShowHandler = (val) => {
    setColumnsToShow(val);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setKeys(selectedRowKeys);
    }
  };
  const [loader, setLoader] = useState(false);

  const onDelete = async () => {
    setLoader(true);
    try {
      const data = await deleteRolePermission(keys);
      if (data.message === "success") {
        window.location.reload();
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.log(error.message);
    }
  };

  return (
    <Card className="card-body mb-3 ">
      <div className="table-responsive">
        <h4 className="text-center mb-2 text-2xl"> Permissions</h4>

        {keys && keys.length > 0 && (
          <div className="text-start mb-1">
            <Button type="danger" onClick={onDelete} loading={loader}>
              Supprimer
            </Button>
          </div>
        )}
        {columns.length > 0 && (
          <div style={{ marginBottom: "30px" }}>
            <ColVisibilityDropdown
              options={columns}
              columns={columns}
              columnsToShowHandler={columnsToShowHandler}
            />
          </div>
        )}
        <Table
          rowSelection={columnsToShow.length > 0 && rowSelection}
          columns={columnsToShow}
          dataSource={role}
          pagination={{
            pageSize: 20,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50"]
          }}
          rowKey={(record) => record.id}
        />
        {/* <table className='table '>
					<thead className='thead-dark'>
						<tr>
							<th scope='col'>#ID</th>
							<th scope='col'>Permission Name</th>
							<th scope='col'>Created AT</th>
							<th scope='col'>Updated AT</th>
						</tr>
					</thead>
					<tbody>
						{role &&
							role.map((i) => (
								<tr>
									<th scope='row'>{i.id}</th>
									<td>{i.permission.name}</td>
									<td>{dayjs(i.createdAt).format("YYYY-MM-DD")}</td>
									<td>{dayjs(i.updatedAt).format("YYYY-MM-DD")}</td>
								</tr>
							))}
					</tbody>
				</table> */}
      </div>
    </Card>
  );
};

export default CustomTable;
