import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../pages/HomePage";
import SearchPage from "../pages/SearchPage";
import CompanyPage from "../pages/CompanyPage";
import CompanyProfile from "../Components/CompanyProfile";
import IncomeStatement from "../Components/IncomeStatement";
import DesignGuide from "../pages/DesignGuide";
import BalanceSheet from "../Components/BalanceSheet";
import CashFlowStatement from "../Components/CashFlowStatement";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "search", element: <SearchPage /> },
      { path: "design-guide", element: <DesignGuide /> },
      { path: "company/:ticker",
        element: <CompanyPage />,
        children: [
          { path: "company-profile", element: <CompanyProfile /> },
          { path: "income-statement", element: <IncomeStatement /> },
          { path: "balance-sheet", element: <BalanceSheet /> },
          { path: "cashflow-statement", element: <CashFlowStatement /> },
        ],
      },
    ],
  },
]);
