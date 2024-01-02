import React from "react";
import { useUser } from "../UserContext";
import { useState, useEffect } from "react";

import styles from "../Styles/UserPortal.module.css";

const UserPortal = () => {
  const user = useUser();
  const [showHulpmiddelen, setShowHulpmiddelen] = useState([]);
  const [users, setUsers] = useState([]);
  const [hulpmiddelen, setHulpmiddelen] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    fetchOnderzoeken();
    initializeHulpmiddelen();
  }, []);
  const initializeHulpmiddelen = async (e) => {
    const hulpmiddelen = [
      "Rolstoel",
      "Looprek",
      "Krukken",
      "Hoorapparaat",
      "Bril",
      "Prothese",
      "Scootmobiel",
      "Aangepast bestek",
      "Aanpassingen in de woning",
      "Communicatiehulpmiddel",
    ];
    setHulpmiddelen(hulpmiddelen);
  };
  const fetchOnderzoeken = async (e) => {
    console.log(user.jwt);
    const result = await fetch(
      "https://localhost:7225/api/Onderzoek/GetAllOnderzoeken",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.jwt,
        },
      }
    );
    if (result.ok) {
      const data = await result.json();
      setUsers(data);
      console.log(data);
    } else {
      console.error(`Error: ${result.status}`);
    }
  };



  const toonMeer = async (index) => {
    const result = await fetch(
      `https://localhost:7225/api/Onderzoek/GetOnderzoekByID/${index}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.jwt,
        },
      }
    );
    if (result.ok) {
      const data = await result.json();
      setData(data);
    } else {
      console.error(`Error: ${result.status}`);
    }
  };

  //   const columns = [
  //     {
  //       Header: "Titel",
  //       accessor: "titel",
  //       Cell: (row) => <div>{row.value}</div>,
  //     },
  //     {
  //       Header: "Beschrijving",
  //       accessor: "korteBeschrijving",
  //       Cell: (row) => <div>{row.value}</div>,
  //     },
  //     {
  //       Header: "Beloning",
  //       accessor: "beloning",
  //       Cell: (row) => <div>{row.value}</div>,
  //     },
  //   ];

  // return(
  //     <div>
  //         <Table columns={columns} data={users} />
  //         <TableFooter onCreation={awd}
  //         text="Voeg onderzoek toe"
  //         id={"BandCreateLabel"}
  //         errorVisible={errorVisible}
  //         />
  //     </div>
  // )

  // function Table({ columns, data }) {
  //     const {
  //         getTableProps,
  //         getTableBodyProps,
  //         headerGroups,
  //         rows,
  //         prepareRow,
  //     }=useTable({
  //         columns,
  //         data,
  //     })
  // }

  // return (
  //     <Table {...getTableProps()}>
  //         <thead>
  //         {headerGroups.map(headerGroup => (
  //             <tr {...headerGroup.getHeaderGroupProps()}>
  //                 {headerGroup.headers.map(column => (
  //                     <th {...column.getHeaderProps()}>{column.render('Header')}</th>
  //                 ))}
  //             </tr>
  //         ))}
  //         </thead>
  //         <tbody {...getTableBodyProps()}>
  //         {rows.map((row, i) => {
  //             prepareRow(row)
  //             return (
  //                 <tr {...row.getRowProps()}>
  //                     {row.cells.map(cell => {
  //                         return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
  //                     })}
  //                 </tr>
  //             )
  //         })}
  //         </tbody>
  //     </Table>
  // )

  //   return (
  //     <div>
  //       <h1>Welcome, {}!</h1>
  //       <button onClick={fetchOnderzoeken}>fetch odnderzoeken</button>
  //     </div>
  //   );

  //   return (
  //     <div>
  //       {/* <button onClick={fetchOnderzoeken}>fetch onderzoeken</button> */}
  //       <div>
  //         {users.map((user, index) => (
  //           <div key={index}>
  //             <h2>{user.titel}</h2>
  //             <p>{user.korteBeschrijving}</p>
  //             <button onClick={(e) => awd(user.onderzoekId)}>
  //               print user id
  //             </button>
  //             <ul>
  //             {hulpmiddelen.map((hulpmiddel, hIndex) => (
  //               <li key={hIndex}>
  //                 {hulpmiddel}
  //               </li>
  //             ))}
  //           </ul>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // };

  // return (
  //     <div>
  //       <div>
  //         {users.map((user, index) => (
  //           <div key={index}>
  //             <h2>{user.titel}</h2>
  //             <p>{user.korteBeschrijving}</p>
  //             <button onClick={(e) => awd(user.onderzoekId)}>
  //               print user id
  //             </button>
  //             <button onClick={(e) => toonMeer(user.onderzoekId)}>
  //               Toon meer
  //             </button>
  //             <button onClick={() => {
  //               const newShowHulpmiddelen = [...showHulpmiddelen];
  //               newShowHulpmiddelen[index] = !newShowHulpmiddelen[index];
  //               setShowHulpmiddelen(newShowHulpmiddelen);
  //             }}>
  //               Toon hulpmiddelen
  //             </button>
  //             {showHulpmiddelen[index] && (
  //               <ul>
  //                 {hulpmiddelen.map((hulpmiddel, hIndex) => (
  //                   <li key={hIndex}>
  //                     {hulpmiddel}
  //                   </li>
  //                 ))}
  //               </ul>
  //             )}
  //           </div>
  //         ))}
  //       </div>
  //       <button onClick={() => setIsModalOpen(true)}>
  //       Open Profile
  //     </button>
  //     {isModalOpen && (
  //   <div
  //     onClick={() => setIsModalOpen(false)}
  //     style={{
  //       position: 'fixed',
  //       top: 0,
  //       left: 0,
  //       right: 0,
  //       bottom: 0,
  //       backgroundColor: 'rgba(0, 0, 0, 0.5)',
  //       display: 'flex',
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //     }}
  //   >
  //     <div
  //       onClick={(e) => e.stopPropagation()}
  //       style={{
  //         backgroundColor: 'white',
  //         padding: '1em',
  //         maxWidth: '90%',
  //         maxHeight: '90%',
  //         overflow: 'auto',
  //       }}
  //     >
  //       <h2>Profile</h2>
  //       {/* Add your profile details here */}
  //       <button onClick={() => setIsModalOpen(false)}>
  //         Close
  //       </button>
  //     </div>
  //   </div>
  // )}
  //     </div>
  //   );

  return (
    <div>
      <div>
        {users.map((user, index) => (
          <div key={index}>
            <h2>{user.titel}</h2>
            <p>{user.korteBeschrijving}</p>
            <button
              onClick={() => {
                setIsModalOpen(true);
                toonMeer(user.onderzoekId);
              }}
            >
              Toon meer Informatie
            </button>

            <button
              onClick={() => {
                const newShowHulpmiddelen = [...showHulpmiddelen];
                newShowHulpmiddelen[index] = !newShowHulpmiddelen[index];
                setShowHulpmiddelen(newShowHulpmiddelen);
              }}
            >
              Toon hulpmiddelen
            </button>
            {showHulpmiddelen[index] && (
              <ul>
                {hulpmiddelen.map((hulpmiddel, hIndex) => (
                  <li key={hIndex}>{"-"+hulpmiddel}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "white",
              padding: "1em",
              maxWidth: "90%",
              maxHeight: "90%",
              overflow: "auto",
            }}
          >
            <h2>Profile</h2>
            {
              <div>
                {Object.keys(data).map((key, index) => (
                  <p key={index}>
                    {key}: {data[key] ? data[key].toString() : "null"}
                  </p>
                ))}
              </div>
            }
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default UserPortal;
