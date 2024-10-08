import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Typography
} from "antd";
import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { addSalaryHistory } from "./salaryHistoryApis";
import UserPrivateComponent from "../PrivateRoutes/UserPrivateComponent";

const AddSalaryHistory = ({ drawer }) => {
  const [loader, setLoader] = useState(false);

  const { Title } = Typography;

  const onFinish = async (values) => {
    setLoader(true);
    const resp = await addSalaryHistory(values);

    if (resp.message === "success") {
      setLoader(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.warning("Failed at adding Salary History");
    setLoader(false);
  };
  return (
    <Fragment bordered={false}>
      <UserPrivateComponent permission={"create-salaryHistory"}>
        <Row className="mr-top" justify={drawer ? "center" : "space-between"}>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={drawer ? 22 : 16}
            xl={drawer ? 22 : 12}
            className="column-design border rounded card-custom"
          >
            <Title level={4} className="m-2 mt-5 mb-5 text-center">
              Ajouter un nouvel historique de salaire
            </Title>
            <Form
              style={{ marginBottom: "100px" }}
              eventKey="Salary History-form"
              name="basic"
              labelCol={{
                span: 6
              }}
              wrapperCol={{
                span: 12
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <div>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Salaire"
                  salary="salary"
                  rules={[
                    {
                      required: true,
                      message: "Entrez votre salaire!"
                    }
                  ]}
                >
                  <InputNumber placeholder="ex:10000" />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Date de debut"
                  name="salaryStartDate"
                  rules={[
                    {
                      required: true,
                      message: "Please input your start date!"
                    }
                  ]}
                >
                  <DatePicker placeholder="Selectionnez la date" />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Date de fin"
                  name="salaryEndDate"
                >
                  <DatePicker placeholder="Selectionnez la date" />
                </Form.Item>

                <Form.Item label="Commentaire" name="salaryComment">
                  <Input placeholder="commentaire" />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  wrapperCol={{
                    offset: 6,
                    span: 12
                  }}
                >
                  <Button
                    onClick={() => setLoader(true)}
                    type="primary"
                    size="small"
                    htmlType="submit"
                    block
                    loading={loader}
                  >
                    Ajouter une nouvelle désignation
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </Col>
        </Row>
      </UserPrivateComponent>
    </Fragment>
  );
};

export default AddSalaryHistory;
