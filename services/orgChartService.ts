import { Position, PositionTree } from "@/types/orgChart";

const POSITIONS_MOCK: Position[] = [
  {
    id: "1",
    name: "Department Director",
    department: "Engineering",
    level: 1,
    parentId: null,
    superiorName: undefined,
    employeeCount: 12,
    status: "Active",
    directReportNames: ["Senior Architect", "Cloud Infra Lead"],
    iconType: "crown",
  },
  {
    id: "2",
    name: "Senior Architect",
    department: "Engineering",
    level: 4,
    parentId: "1",
    superiorName: "Department Director",
    employeeCount: 4,
    status: "Active",
    directReportNames: ["Frontend Developer", "Backend Developer", "QA Lead"],
    iconType: "person",
  },
  {
    id: "3",
    name: "Cloud Infra Lead",
    department: "Engineering",
    level: 3,
    parentId: "1",
    superiorName: "Department Director",
    employeeCount: 2,
    status: "Active",
    directReportNames: [],
    iconType: "cloud",
  },
  {
    id: "4",
    name: "Frontend Dev",
    department: "Engineering",
    level: 5,
    parentId: "2",
    superiorName: "Senior Architect",
    employeeCount: 8,
    status: "Active",
    directReportNames: [],
    iconType: "code",
  },
  {
    id: "5",
    name: "Backend Dev",
    department: "Engineering",
    level: 5,
    parentId: "2",
    superiorName: "Senior Architect",
    employeeCount: 12,
    status: "Active",
    directReportNames: [],
    iconType: "code",
  },
];

export const getPositions = async (): Promise<Position[]> => {
  await new Promise((r) => setTimeout(r, 400));
  return POSITIONS_MOCK;
};

export const buildPositionTree = (positions: Position[]): PositionTree => {
  const map = new Map<string, PositionTree>();
  positions.forEach((p) => map.set(p.id, { ...p, children: [] }));

  let root: PositionTree | null = null;
  map.forEach((node) => {
    if (node.parentId === null) {
      root = node;
    } else {
      const parent = map.get(node.parentId);
      if (parent) parent.children.push(node);
    }
  });

  if (!root) throw new Error("No root position found in hierarchy");
  return root;
};

export const getAllPositionNames = (): string[] =>
  POSITIONS_MOCK.map((p) => p.name);
