"use client";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import React, { useState } from "react";

const Dashboard = () => {
  const [asalUsul, setAsalUsul] = useState({
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "Jumlah data",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  });

  const [legalitas, setLegalitas] = useState({
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "Jumlah data",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  });

  const [kategori, setKategori] = useState({
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "Jumlah data",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  });

  const [uraianKasus, setUraianKasus] = useState({
    labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
    datasets: [
      {
        label: "Jumlah data",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
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
        ],
        borderWidth: 1,
      },
    ],
  });
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
                <span className="font-semibold text-3xl">81</span>
              </div>
              <div className="w-1/4 px-3 py-2 rounded-lg bg-white shadow-lg flex items-center justify-end gap-3">
                <p>Aset Bersertifikat</p>
                <span className="font-semibold text-3xl">48</span>
              </div>
              <div className="w-1/4 px-3 py-2 rounded-lg bg-white shadow-lg flex items-center justify-end gap-3">
                <p>Aset Non Sertifikat</p>
                <span className="font-semibold text-3xl">13</span>
              </div>
              <div className="w-1/4 px-3 py-2 rounded-lg bg-white shadow-lg flex items-center justify-end gap-3">
                <p>Aset Proses Sertifikasi</p>
                <span className="font-semibold text-3xl">20</span>
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
