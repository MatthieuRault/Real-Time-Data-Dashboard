import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WeatherWidget from "../../components/widgets/WeatherWidget/WeatherWidget";
import CryptoList from "../../components/widgets/CryptoWidget/CryptoList";
import { dashboardService } from "../../services/dashboardService";
import { Dashboard, Widget } from "../../types/dashboard";
import WidgetConfigModal from "../widgets/WidgetConfigModal";

const DashboardPage = () => {
  const { code } = useParams<{ code: string }>();
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [tempWidgetData, setTempWidgetData] = useState<{
    type: "weather" | "crypto";
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        if (!code) return;
        const data = await dashboardService.getDashboardByCode(code);
        // console.log(data);
        setDashboard(data.dashboard);
        setWidgets(data.widgets || []);
      } catch (err) {
        console.error(err);
      }
    };

    loadDashboard();
  }, [code]);

  const handleWidgetDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    widgetType: Widget["category"]
  ) => {
    e.dataTransfer.setData("widgetType", widgetType);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!dashboard?._id) return;

    const widgetType = e.dataTransfer.getData("widgetType") as
      | "weather"
      | "crypto";
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * 12);
    const y = Math.floor((e.clientY - rect.top) / 100);

    setTempWidgetData({ type: widgetType, x, y });
    setConfigModalOpen(true);
  };

  const handleConfigConfirm = async (config: {
    city?: string;
    type?: "top" | "single";
    name?: string;
  }) => {
    if (!tempWidgetData || !dashboard?._id) return;

    const newWidget = {
      category: tempWidgetData.type,
      positionX: tempWidgetData.x,
      positionY: tempWidgetData.y,
      dashboard_id: dashboard._id,
      parameters: {
        apiUrl: `${
          tempWidgetData.type === "weather" ? "/api/weather" : "/api/crypto"
        }`,
        ...(tempWidgetData.type === "weather" ? { city: config.city } : {}),
        ...(tempWidgetData.type === "crypto"
          ? {
              type: config.type,
              name: config.name,
            }
          : {}),
      },
    };

    try {
      const response = await dashboardService.addWidgetToDashboard(
        dashboard._id,
        newWidget
      );
      // console.log("Widget ajouté", response);
      setWidgets((prev) => [...prev, response.data]);
    } catch (err) {
      console.error("Erreur d'ajout:", err);
    }

    setTempWidgetData(null);
    setConfigModalOpen(false);
  };

  if (!dashboard) {
    return <div className="p-4">Chargement...</div>;
  }

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-100 p-4">
        <h2 className="mb-4 text-lg font-bold">
          Liste des Widgets disponibles
        </h2>
        <div className="space-y-2">
          <div
            draggable // permet de rendre l'élément draggable
            onDragStart={(e) => handleWidgetDragStart(e, "weather")}
            className="cursor-move rounded bg-white p-3 shadow hover:shadow-md"
          >
            Widget Météo
          </div>
          <div
            draggable
            onDragStart={(e) => handleWidgetDragStart(e, "crypto")}
            className="cursor-move rounded bg-white p-3 shadow hover:shadow-md"
          >
            Widget Crypto
          </div>
        </div>
      </div>

      <div
        className="flex-1 p-4"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <h1 className="mb-4 text-2xl font-bold">
          Nom du Dashboard : {dashboard.name}
        </h1>

        <div className="grid grid-cols-12 gap-4">
          {widgets.map((widget) => (
            <div
              key={widget._id}
              className="col-span-4 rounded bg-white p-4 shadow"
              style={{
                gridColumnStart: (widget.positionX % 12) + 1,
                gridRowStart: widget.positionY + 1,
              }}
            >
              {widget.category === "weather" ? (
                <WeatherWidget city={widget.parameters.city} />
              ) : (
                <CryptoList
                  type={widget.parameters.type as "top" | "single"}
                  cryptoName={widget.parameters.name}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {tempWidgetData && (
        <WidgetConfigModal
          isOpen={configModalOpen}
          onClose={() => {
            setConfigModalOpen(false);
            setTempWidgetData(null);
          }}
          widgetType={tempWidgetData.type}
          onConfirm={handleConfigConfirm}
        />
      )}
    </div>
  );
};

export default DashboardPage;
