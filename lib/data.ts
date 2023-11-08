const dataURL =
  "https://gist.githubusercontent.com/kabaros/da79636249e10a7c991a4638205b1726/raw/fa044f54e7a5493b06bb51da40ecc3a9cb4cd3a5";

export type Dashboard = {
  access?: {
    manage: boolean;
    externalize: boolean;
    write: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
  };
  restrictFilters?: boolean;
  allowedFilters?: [];
  displayName: string;
  id: string;
  starred: boolean;
  dashboardItems: Array<{ type: string }>;
};

async function getSingleDashboard(id: string) {
  const fetchUrl = `${dataURL}/${id}.json`;
  return fetch(fetchUrl, { cache: "force-cache" }).then((response) =>
    response.json()
  );
}
export async function getAllDashboards(term?: string) {
  try {
    const res = await fetch(`${dataURL}/dashboards.json`, {
      cache: "force-cache",
    });
    const dashboardData = await res.json();

    let individualDashboards = [];
    individualDashboards = dashboardData.dashboards.map((item: Dashboard) =>
      getSingleDashboard(item.id)
    );
    const itemizedDashboards: Array<Dashboard> = await Promise.all(
      individualDashboards
    );
    if (term) {
      const filteredDashboards = itemizedDashboards.map((dashItem) => {
        const getFilteredTerms = dashItem.dashboardItems.filter((item) => {
          return item.type === term;
        });
        return {
          ...dashItem,
          dashboardItems: getFilteredTerms,
        };
      });
      return filteredDashboards;
    }
    return itemizedDashboards;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}
