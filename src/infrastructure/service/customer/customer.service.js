// import React, { useState } from "react";
// import { useQuery } from "@apollo/client";

// export const CustomerRequest = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);

//   const getData = () => {
//     setLoading(true);
//     const { data, error, loading } = useQuery(GET_CustomerS, {
//       variables: {
//         page: 1,
//       }
//     });

//     if (loading) {
//       console.log("loading", loading)
//       setLoading(true);
//     }

//     if (data) {
//       console.log("data", data)
//       // setList(data.paginatedOrders);
//       setLoading(false);
//     }

//     if (error) {
//       console.log("error", error)
//       setError(error);
//       setLoading(false);
//     }
//   }

//   return (
//     <CustomerContext.Provider value={{
//       loading,
//       error,
//       list,
//       getData,
//     }}>
//       {children}
//     </CustomerContext.Provider>
//   )
// };
