import React, { useEffect, useState } from "react";
import type { CompanyCashFlow } from "../../company";
import { useOutletContext } from "react-router-dom";
import { getCashflowStatement } from "../api";
import Table from "./Table";
import Spinner from "./Spinner";
import { formatLargeMonetaryNumber } from "../Helpers/NumberFormatting";

interface Props {}

const config = [
  {
    label: "Date",
    render: (company: CompanyCashFlow) => company.date,
  },
  {
    label: "Operating Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.operatingCashFlow),
  },
  {
    label: "Investing Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.otherInvestingActivities),
  },
  {
    label: "Financing Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(
        company.netCashProvidedByFinancingActivities
      ),
  },
  {
    label: "Cash At End of Period",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.cashAtEndOfPeriod),
  },
  {
    label: "CapEX",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.capitalExpenditure),
  },
  {
    label: "Issuance Of Stock",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.commonStockIssuance),
  },
  {
    label: "Free Cash Flow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.freeCashFlow),
  },
];

const CashFlowStatement = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [cahflowData, setCashflowData] = useState<CompanyCashFlow>();
  useEffect(() => {
    const getCashflowData = async () => {
      const result: any = await getCashflowStatement(ticker!);
      setCashflowData(result?.data);
    };
    getCashflowData();
  }, []);
  return (<>
  {cahflowData ? (
    <Table config={config} data={cahflowData} />
  ) : (
    <Spinner />
  )}
  </>);
};

export default CashFlowStatement;
