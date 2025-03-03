"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { MandiRecord } from "./type";
import { Button } from "@/components/ui/button";

export default function MandiPrices() {
  const [data, setData] = useState<MandiRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070",
          {
            params: {
              "api-key":
                "579b464db66ec23bdd000001b13cfa4062874da1781af66722a93f89",
              format: "json",
              limit: 10,
              offset: (page - 1) * 10,
            },
          }
        );
        console.log(response.data);
        setData(response.data.records);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [page]);

  const filteredData = data.filter((item) =>
    item.commodity.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p className="w-full h-full">Loading...</p>;
  if (error) return <p className="w-full h-full">{error}</p>;

  return (
    <div className="p-4 px-12 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Mandi Commodity Prices</h1>
      <input
        type="text"
        placeholder="Search for a crop"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <table className="border-collapse border border-gray-300 w-3/4">
        <thead>
          <tr>
            <th className="border p-2">State</th>
            <th className="border p-2">District</th>
            <th className="border p-2">Market</th>
            <th className="border p-2">Commodity</th>
            <th className="border p-2">Min Price</th>
            <th className="border p-2">Max Price</th>
            <th className="border p-2">Modal Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="border p-2">{item.state}</td>
              <td className="border p-2">{item.district}</td>
              <td className="border p-2">{item.market}</td>
              <td className="border p-2">{item.commodity}</td>
              <td className="border p-2">{item.min_price}</td>
              <td className="border p-2">{item.max_price}</td>
              <td className="border p-2">{item.modal_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button className="mt-4 p-" onClick={() => setPage(page + 1)}>
        Next
      </Button>
    </div>
  );
}
