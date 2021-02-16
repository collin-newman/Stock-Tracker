// import React, { useState } from 'react';

// interface stock {
//   _id: string;
//   ticker: string;
//   assets: number;
//   liabilities: number;
//   equity: number;
//   debt: number;
//   revenue: number;
//   costOfRevenue: number;
// }

// interface StockContextInterface {
//   stocks: stock[];
// }

// const StockContext = React.createContext<StockContextInterface | undefined>(undefined);

// type Props = {
//   children: React.ReactNode
// };

// export const StockProvider = ({ children }: Props) => {
//   const [stocks, setStocks] = React.useState<StockContextInterface>({ stocks: [] });

//   return (
//     <StockContext.Provider value={{ stocks, setStocks }}>
//       {children}
//     </StockContext.Provider>
//   );
// };

// export default StockContext;