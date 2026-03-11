import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { CompanyKeyMetrics } from "../../company";
import { getKeyMetrics } from "../api";
import RatioList from "./RatioList";
import Spinner from "./Spinner";
import {
  formatLargeMonetaryNumber,
  formatLargeNonMonetaryNumber,
  formatRatio,
} from "../Helpers/NumberFormatting";
import StockComment from "./StockComment";

const tableConfig = [
  {
    label: "Market Cap",
    render: (company: CompanyKeyMetrics) =>
      formatLargeNonMonetaryNumber(company.marketCap),
    subTitle: "Total value of all a company's shares of stock",
  },
  {
    label: "Current Ratio",
    render: (company: CompanyKeyMetrics) => formatRatio(company.currentRatioTTM),
    subTitle:
      "Measures the companies ability to pay short term debt obligations",
  },
  {
    label: "Return On Equity",
    render: (company: CompanyKeyMetrics) => formatRatio(company.returnOnEquityTTM),
    subTitle:
      "Return on equity is the measure of a company's net income divided by its shareholder's equity",
  },
  {
    label: "Return On Assets",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.returnOnTangibleAssetsTTM),
    subTitle:
      "Return on assets is the measure of how effective a company is using its assets",
  },
  {
    label: "Free Cashflow to Equity",
    render: (company: CompanyKeyMetrics) =>
      formatLargeMonetaryNumber(company.freeCashFlowToEquityTTM),
    subTitle:
      "Return amount of cash the business is available to be potentially distributed to shareholders",
  },
  {
    label: "Free Cashflow to Firm",
    render: (company: CompanyKeyMetrics) =>
      formatLargeMonetaryNumber(company.freeCashFlowToFirmTTM),
    subTitle:
      "The cash flow available to all funding providers (debt holders, preferred stockholders, common stockholders, convertible bond investors, etc.",
  },
  {
    label: "Earnings Yield TTM",
    render: (company: CompanyKeyMetrics) => formatRatio(company.earningsYieldTTM),
    subTitle:
      "Shows how much a company earns per share each year relative to stock price",
  },
  {
    label: "Capex to Operating Cashflow",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.capexToOperatingCashFlowTTM),
    subTitle:
      "Capex is used by a company to aquire, upgrade, and maintain physical assets",
  },
  {
    label: "Graham Number",
    render: (company: CompanyKeyMetrics) => formatRatio(company.grahamNumberTTM),
    subTitle:
      "This is the upperbouind of the price range that a defensive investor should pay for a stock",
  }
];

const CompanyProfile = () => {
  const ticker = useOutletContext<string>();
  const [companyData, setCompanyData] = useState<CompanyKeyMetrics>();

  useEffect(() => {
    const getCompanyKeyMetrics = async () => {
      const value: any = await getKeyMetrics(ticker);
      setCompanyData(value?.data[0]);
    };
    getCompanyKeyMetrics();
  }, []);

  return (
    <>
      {companyData ? (
        <>
          <RatioList data={companyData} config={tableConfig} />
          <StockComment stockSymbol={ticker} />
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default CompanyProfile;
