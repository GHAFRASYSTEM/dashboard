"use client";

import { useState } from "react";
import { DashboardLayout } from "../../components/dashboard-layout";
import { DataTable, StatusBadge } from "../../components/data-table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { format } from "date-fns";
import {
  DollarSign,
  TrendingUp,
  Users,
  CheckCircle,
  XCircle,
  Download,
  Calendar,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Contribution {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  month: string;
  year: number;
  status: "paid" | "pending" | "overdue";
  paidAt?: Date;
  reference?: string;
}

const mockContributions: Contribution[] = [
  {
    id: "1",
    memberId: "GAF-001",
    memberName: "Kwame Asante",
    amount: 50,
    month: "March",
    year: 2024,
    status: "paid",
    paidAt: new Date("2024-03-05"),
    reference: "TXN-001234",
  },
  {
    id: "2",
    memberId: "GAF-002",
    memberName: "Ama Serwaa",
    amount: 50,
    month: "March",
    year: 2024,
    status: "paid",
    paidAt: new Date("2024-03-08"),
    reference: "TXN-001235",
  },
  {
    id: "3",
    memberId: "GAF-003",
    memberName: "Kofi Mensah",
    amount: 50,
    month: "March",
    year: 2024,
    status: "pending",
  },
  {
    id: "4",
    memberId: "GAF-004",
    memberName: "Efua Boateng",
    amount: 50,
    month: "March",
    year: 2024,
    status: "overdue",
  },
  {
    id: "5",
    memberId: "GAF-005",
    memberName: "Yaw Adjei",
    amount: 50,
    month: "March",
    year: 2024,
    status: "paid",
    paidAt: new Date("2024-03-10"),
    reference: "TXN-001236",
  },
  {
    id: "6",
    memberId: "GAF-006",
    memberName: "Akosua Darko",
    amount: 50,
    month: "March",
    year: 2024,
    status: "pending",
  },
  {
    id: "7",
    memberId: "GAF-007",
    memberName: "Kwabena Owusu",
    amount: 50,
    month: "March",
    year: 2024,
    status: "paid",
    paidAt: new Date("2024-03-12"),
    reference: "TXN-001237",
  },
  {
    id: "8",
    memberId: "GAF-008",
    memberName: "Adwoa Amponsah",
    amount: 50,
    month: "March",
    year: 2024,
    status: "paid",
    paidAt: new Date("2024-03-15"),
    reference: "TXN-001238",
  },
];

const monthlyData = [
  { month: "Jan", amount: 4200, members: 84 },
  { month: "Feb", amount: 4500, members: 90 },
  { month: "Mar", amount: 4100, members: 82 },
  { month: "Apr", amount: 4800, members: 96 },
  { month: "May", amount: 4600, members: 92 },
  { month: "Jun", amount: 5000, members: 100 },
];

const statusMap = {
  paid: { label: "Paid", class: "bg-success/10 text-success" },
  pending: { label: "Pending", class: "bg-warning/10 text-warning" },
  overdue: { label: "Overdue", class: "bg-destructive/10 text-destructive" },
};

export default function ContributionsPage() {
  const [contributions] = useState(mockContributions);
  const [selectedMonth, setSelectedMonth] = useState("March 2024");

  const paidCount = contributions.filter((c) => c.status === "paid").length;
  const pendingCount = contributions.filter(
    (c) => c.status === "pending",
  ).length;
  const overdueCount = contributions.filter(
    (c) => c.status === "overdue",
  ).length;
  const totalCollected = contributions
    .filter((c) => c.status === "paid")
    .reduce((acc, c) => acc + c.amount, 0);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const columns = [
    {
      key: "memberName",
      header: "Member",
      render: (item: Contribution) => (
        <div className="flex items-center gap-3">
          <Avatar className="size-9">
            <AvatarFallback className="bg-secondary text-xs">
              {getInitials(item.memberName)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{item.memberName}</p>
            <p className="text-xs text-muted-foreground">{item.memberId}</p>
          </div>
        </div>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      render: (item: Contribution) => (
        <span className="font-medium">${item.amount}</span>
      ),
    },
    {
      key: "month",
      header: "Period",
      render: (item: Contribution) => `${item.month} ${item.year}`,
    },
    {
      key: "status",
      header: "Status",
      render: (item: Contribution) => (
        <Badge variant="secondary" className={statusMap[item.status].class}>
          {statusMap[item.status].label}
        </Badge>
      ),
    },
    {
      key: "paidAt",
      header: "Paid On",
      render: (item: Contribution) => (
        <span className="text-sm text-muted-foreground">
          {item.paidAt ? format(item.paidAt, "MMM d, yyyy") : "-"}
        </span>
      ),
    },
    {
      key: "reference",
      header: "Reference",
      render: (item: Contribution) => (
        <span className="text-sm font-mono text-muted-foreground">
          {item.reference || "-"}
        </span>
      ),
    },
  ];

  return (
    <DashboardLayout
      title="Contributions"
      breadcrumbs={[{ label: "Contributions" }]}
    >
      <div className="grid gap-6 md:grid-cols-4 mb-6">
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <DollarSign className="size-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">${totalCollected}</p>
                <p className="text-sm text-muted-foreground">
                  Collected This Month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-success/10">
                <CheckCircle className="size-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{paidCount}</p>
                <p className="text-sm text-muted-foreground">Paid</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-warning/10">
                <Users className="size-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingCount}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-destructive/10">
                <XCircle className="size-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{overdueCount}</p>
                <p className="text-sm text-muted-foreground">Overdue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Collection Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(0.28 0.01 260)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "oklch(0.65 0.01 260)", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "oklch(0.65 0.01 260)", fontSize: 12 }}
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.16 0.01 260)",
                      border: "1px solid oklch(0.28 0.01 260)",
                      borderRadius: "8px",
                      color: "oklch(0.98 0 0)",
                    }}
                    formatter={(value) => {
                      const amount =
                        typeof value === "number" ? value : Number(value ?? 0);
                      return [`$${amount.toLocaleString()}`, "Amount"];
                    }}
                  />
                  <Bar
                    dataKey="amount"
                    fill="oklch(0.72 0.19 145)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Collection Rate
              </span>
              <span className="font-semibold text-success">
                {Math.round((paidCount / contributions.length) * 100)}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Avg. Monthly
              </span>
              <span className="font-semibold">$4,533</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">YTD Total</span>
              <span className="font-semibold">$27,200</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Outstanding</span>
              <span className="font-semibold text-destructive">
                ${(pendingCount + overdueCount) * 50}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Contribution Records</CardTitle>
          <div className="flex items-center gap-2">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[150px] bg-secondary border-border">
                <Calendar className="size-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="March 2024">March 2024</SelectItem>
                <SelectItem value="February 2024">February 2024</SelectItem>
                <SelectItem value="January 2024">January 2024</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="border-border">
              <Download className="size-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="bg-secondary mb-4">
              <TabsTrigger value="all">
                All ({contributions.length})
              </TabsTrigger>
              <TabsTrigger value="paid">Paid ({paidCount})</TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({pendingCount})
              </TabsTrigger>
              <TabsTrigger value="overdue">
                Overdue ({overdueCount})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <DataTable
                data={contributions}
                columns={columns}
                searchKey="memberName"
                searchPlaceholder="Search by member name..."
                actions={(item) => [
                  { label: "View Details", onClick: () => {} },
                  { label: "Send Reminder", onClick: () => {} },
                  { label: "Mark as Paid", onClick: () => {} },
                ]}
              />
            </TabsContent>
            <TabsContent value="paid">
              <DataTable
                data={contributions.filter((c) => c.status === "paid")}
                columns={columns}
                searchKey="memberName"
                searchPlaceholder="Search by member name..."
              />
            </TabsContent>
            <TabsContent value="pending">
              <DataTable
                data={contributions.filter((c) => c.status === "pending")}
                columns={columns}
                searchKey="memberName"
                searchPlaceholder="Search by member name..."
                actions={(item) => [
                  { label: "Send Reminder", onClick: () => {} },
                  { label: "Mark as Paid", onClick: () => {} },
                ]}
              />
            </TabsContent>
            <TabsContent value="overdue">
              <DataTable
                data={contributions.filter((c) => c.status === "overdue")}
                columns={columns}
                searchKey="memberName"
                searchPlaceholder="Search by member name..."
                actions={(item) => [
                  { label: "Send Reminder", onClick: () => {} },
                  { label: "Mark as Paid", onClick: () => {} },
                ]}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
