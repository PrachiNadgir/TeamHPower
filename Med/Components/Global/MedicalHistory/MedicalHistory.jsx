import React, { useEffect, useState } from "react";

///INTERNAL IMPORT
import Table from "./Table";

import {
  GET_PATIENT_ID,
  GET_PATIENT__HISTORY,
  GET_PATIENT_APPOINTMENT_HISTORYS,
  GET_MEDICINE_DETAILS,
} from "../../../Context/constants";
import { useStateContext } from "../../../Context/index";

const MedicalHistory = ({
  setOpenComponent,
  setMedicineDetails,
  setInvoic,
}) => {
  const { CHECKI_IF_CONNECTED_LOAD, address } = useStateContext();

  const [history, setHistory] = useState();

  const tableHead = [
    {
      name: "MEDICAL HISTORY",
    },
  ];

  const orders = [
    {
      id: "#181", //DUMY DATA
      date: "26/02/2025, 12:42 AM",
      name: "Ricky Antony",
      email: "ricky@example.com",
      address:
        "Ricky Antony, 2392 Main Avenue, Penasauka, New Jersey 02149 Via Flat Rate",
      status: "Completed",
      price: "99 INR",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const address = await CHECKI_IF_CONNECTED_LOAD();
        if (address) {
          const patientID = await GET_PATIENT_ID(address);
          const history = await GET_PATIENT_MEDICAL_HISTORY(patientID);

          console.log(history);
          setHistory(history);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [address]);

  return (
    <div className="container-fluid">
      <div className="page-titles">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="javascript:void(0)">History</a>
          </li>
          <li className="breadcrumb-item active">
            <a href="javascript:void(0)">Medical Histories</a>
          </li>
        </ol>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card overflow-hidden">
            <div className="card-body p-0">
              <div className="table-responsive">
                <Table
                  thead={tableHead}
                  tableData={history}
                  name={"history"}
                  setOpenComponent={setOpenComponent}
                  setMedicineDetails={setMedicineDetails}
                  setInvoic={setInvoic}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;
