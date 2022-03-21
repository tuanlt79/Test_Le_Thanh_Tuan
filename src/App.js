import "./App.css";
import { useState } from "react";
import Button from "./Component/Button";
import { useForm } from "react-hook-form";
function App() {
  const [number, setNumber] = useState([]);
  const { register, handleSubmit, setValue } = useForm();
  const [tableData, setTableData] = useState([]);
  const totalDataNumber = () => {
    let sum = 0;
    number?.reduce((a, b) => {
     return sum=a+b
    },0)
    return sum;
  };
  const onSubmit = (data) => {
    if (!data.numberData) return;
    setNumber([...number, +data.numberData]);
    setTableData([
      ...tableData,
      { id: tableData?.length + 1, numberData: +data?.numberData },
    ]);
    setValue("numberData", "");
  };
  const removeData = (e, id) => {
    const dataClone = [...tableData];
    let findIndex = dataClone?.findIndex((item) => item?.id === id);
    if (findIndex > -1) {
      let filter = dataClone.filter((item) => item.id !== id);
      setTableData(filter);
    }
  };
  const updateDataNumber = (e, type, id) => {
    const dataClone = [...tableData];
    let findIndex = dataClone?.findIndex((item) => item?.id === id);
    if (type) {
      dataClone[findIndex].numberData -= 1;
    } else {
      dataClone[findIndex].numberData += 1;
    }
    setTableData(dataClone);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-5">
            {tableData?.map((item, index) => {
              return (
                <table class="table">
                  <tbody key={index}>
                    <tr>
                      <Button
                        text="-"
                        colorButton="primary"
                        onClick={(e) => {
                          updateDataNumber(e, true, item.id);
                        }}
                      />
                      <td>
                        Item {item?.id} ({item?.numberData})
                      </td>
                      <Button
                        text="+"
                        colorButton="primary"
                        onClick={(e) => {
                          updateDataNumber(e, false, item.id);
                        }}
                        mr="2"
                      />
                      <Button
                        text="Delete"
                        onClick={(e) => {
                          removeData(e, item.id);
                        }}
                      />
                    </tr>
                  </tbody>
                </table>
              );
            })}
            <div className="row">
              <div className="col-5 ">
                Total
                <span className="ml-5">{totalDataNumber()}</span>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div class="form-group d-flex">
                    <input
                      style={{ width: "100%" }}
                      type="text"
                      name="numberData"
                      class="form-control"
                      {...register("numberData")}
                    />
                    <Button text="Add" type="submit" colorButton="success" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
