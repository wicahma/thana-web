"use client";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  getDashboardAsync,
  selectAssetNonSertifikat,
  selectAssetSertifikat,
  selectDashboard,
} from "../../../store/features/asset/assetSlice";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { all } = useAppSelector(selectDashboard);
  const assetNonSertif = useAppSelector(selectAssetNonSertifikat);
  const assetSertif = useAppSelector(selectAssetSertifikat);
  const [asalUsul, setAsalUsul] = useState({
    labels: [""],
    datasets: [
      {
        label: "Jumlah data",
        data: [0],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        hoverOffset: 4,
      },
    ],
  });

  const [legalitas, setLegalitas] = useState({
    labels: [""],
    datasets: [
      {
        label: "Jumlah data",
        data: [0],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        hoverOffset: 4,
      },
    ],
  });

  const [kategori, setKategori] = useState({
    labels: [""],
    datasets: [
      {
        label: "Jumlah data",
        data: [0],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        hoverOffset: 4,
      },
    ],
  });

  const [uraianKasus, setUraianKasus] = useState({
    labels: [""],
    datasets: [
      {
        label: "Jumlah data",
        data: [0],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const [kecamatan, setKecamatan] = useState({
    labels: [""],
    datasets: [
      {
        label: "Jumlah data",
        data: [0],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    dispatch(getDashboardAsync()).then((res) => {
      const {
        payload: { data },
      } = res;
      console.log("PAYLOAD ", data);
      setAsalUsul((prev) => ({
        ...prev,
        labels: data.asalUsul.map((item) => item.asal_usul),
        datasets: [
          {
            label: "Jumlah data",
            data: data.asalUsul.map((item) => item.total),
          },
        ],
      }));
      setLegalitas((prev) => ({
        ...prev,
        labels: data.legalitas.map((item) => item.legalitas),
        datasets: [
          {
            label: "Jumlah data",
            data: data.legalitas.map((item) => item.total),
          },
        ],
      }));
      setKategori((prev) => ({
        ...prev,
        labels: data.kategori.map((item) => item.kategori),
        datasets: [
          {
            label: "Jumlah data",
            data: data.kategori.map((item) => item.total),
          },
        ],
      }));
      setUraianKasus((prev) => ({
        ...prev,
        labels: data.kasus.map((item) => item.uraian_kasus),
        datasets: [
          {
            label: "Jumlah data",
            data: data.kasus.map((item) => item.total),
          },
        ],
      }));
      setKecamatan((prev) => ({
        ...prev,
        labels: data.kecamatan.map((item) => item.kecamatan.nama),
        datasets: [
          {
            label: "Jumlah data",
            data: data.kecamatan.map((item) => item.total),
          },
        ],
      }));
    });
  }, []);

  return (
    <div className="fixed z-[999] text-base w-screen top-0 left-0">
      <div className="w-full h-full mt-14 p-3">
        <div className="flex gap-3">
          <div className="flex flex-col gap-3 ">
            <div className="flex gap-3 basis-1/3 grow">
              <div className="bg-white rounded-lg h-fit max-w-72 w-full p-3">
                <Doughnut
                  title="Asal Usul"
                  data={asalUsul}
                  options={{
                    plugins: {
                      legend: {
                        position: "top",
                      },
                      title: {
                        display: true,
                        text: "Asal Usul",
                        position: "bottom",
                        color: "#000",
                      },
                    },
                    responsive: true,
                    tooltips: {
                      mode: "index",
                      intersect: false,
                    },
                    hover: {
                      mode: "index",
                      intersect: false,
                    },
                  }}
                />
              </div>
              <div className="bg-white rounded-lg h-fit max-w-72 w-full p-3">
                <Doughnut
                  title="Legalitas"
                  data={legalitas}
                  options={{
                    plugins: {
                      legend: {
                        position: "top",
                      },
                      title: {
                        display: true,
                        text: "Legalitas",
                        position: "bottom",
                        color: "#000",
                      },
                    },
                    responsive: true,
                    tooltips: {
                      mode: "index",
                      intersect: false,
                    },
                    hover: {
                      mode: "index",
                      intersect: false,
                    },
                  }}
                />
              </div>
              <div className="bg-white rounded-lg h-fit max-w-72 w-full p-3">
                <Doughnut
                  title="Kategori"
                  data={kategori}
                  options={{
                    plugins: {
                      legend: {
                        position: "top",
                      },
                      title: {
                        display: true,
                        text: "kategori",
                        position: "bottom",
                        color: "#000",
                      },
                    },
                    responsive: true,
                    tooltips: {
                      mode: "index",
                      intersect: false,
                    },
                    hover: {
                      mode: "index",
                      intersect: false,
                    },
                  }}
                />
              </div>
            </div>
            <div className="bg-white basis-2/3 rounded-lg h-fit w-full p-3">
              <Bar
                data={uraianKasus}
                options={{
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: true,
                      text: "kategori",
                      position: "bottom",
                      color: "#000",
                    },
                  },
                  responsive: true,
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 grow">
            <div className="basis-1/3 flex flex-col text-gray-700 justify-between items-end">
              <div className="w-1/4 px-3 py-2 rounded-lg bg-white shadow-lg flex items-center justify-end gap-3">
                <p>Total Asset</p>
                <span className="font-semibold text-3xl">{all}</span>
              </div>
              <div className="w-1/4 px-3 py-2 rounded-lg bg-white shadow-lg flex items-center justify-end gap-3">
                <p>Aset Bersertifikat</p>
                <span className="font-semibold text-3xl">
                  {assetSertif.total || 0}
                </span>
              </div>
              <div className="w-1/4 px-3 py-2 rounded-lg bg-white shadow-lg flex items-center justify-end gap-3">
                <p>Aset Non Sertifikat</p>
                <span className="font-semibold text-3xl">
                  {assetNonSertif.total || 0}
                </span>
              </div>
              <div className="w-1/4 px-3 py-2 rounded-lg bg-white shadow-lg flex items-center justify-end gap-3">
                <p>Aset Proses Sertifikasi</p>
                <span className="font-semibold text-3xl">0</span>
              </div>
            </div>
            <div className="bg-white basis-2/3 rounded-lg h-fit w-full p-3">
              <Bar
                data={kecamatan}
                options={{
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: true,
                      text: "kategori",
                      position: "bottom",
                      color: "#000",
                    },
                  },
                  responsive: true,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
