"use client";

import { useState } from "react";
import { DashboardLayout } from "../../components/dashboard-layout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Separator } from "../../components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { format, formatDistanceToNow } from "date-fns";
import {
  Briefcase,
  MapPin,
  Clock,
  Users,
  DollarSign,
  Plus,
  Search,
  MoreVertical,
  Building2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ExternalLink,
  Mail,
  Phone,
  Globe,
  GraduationCap,
  FileText,
  Edit2,
  Trash2,
  Eye,
  Send,
  Bookmark,
  Share2,
  ChevronRight,
} from "lucide-react";

interface Internship {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: "remote" | "onsite" | "hybrid";
  contractType: "internship" | "fulltime" | "alternance";
  duration: string;
  stipend?: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  skills: string[];
  status: "active" | "inactive" | "pending";
  applications: number;
  postedAt: Date;
  deadline: Date;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  department?: string;
}

const mockInternships: Internship[] = [
  {
    id: "1",
    title: "Software Engineering Intern",
    company: "TechCorp Ghana",
    companyLogo:
      "https://images.unsplash.com/photo-1549924231-f129b911e442?w=100&h=100&fit=crop",
    location: "Accra",
    type: "hybrid",
    contractType: "internship",
    duration: "3 months",
    stipend: "GHS 2,500/month",
    description:
      "Join our engineering team to work on exciting projects using cutting-edge technologies. You will be part of a dynamic team building scalable web applications that serve millions of users across Africa. This is an excellent opportunity to gain hands-on experience in a fast-paced tech environment.",
    requirements: [
      "Currently pursuing a degree in Computer Science or related field",
      "Strong understanding of JavaScript and modern frameworks",
      "Familiarity with React or Vue.js",
      "Basic knowledge of backend development",
      "Excellent problem-solving skills",
    ],
    responsibilities: [
      "Develop and maintain web applications using React",
      "Collaborate with senior engineers on feature development",
      "Participate in code reviews and team meetings",
      "Write clean, maintainable, and well-documented code",
      "Assist in debugging and troubleshooting issues",
    ],
    benefits: [
      "Competitive monthly stipend",
      "Flexible working hours",
      "Mentorship from senior engineers",
      "Certificate of completion",
      "Potential for full-time offer",
    ],
    skills: ["JavaScript", "React", "Node.js", "Git", "SQL"],
    status: "active",
    applications: 45,
    postedAt: new Date("2024-03-01"),
    deadline: new Date("2024-04-15"),
    contactEmail: "careers@techcorp.gh",
    contactPhone: "+233 20 123 4567",
    website: "https://techcorp.gh",
    department: "Engineering",
  },
  {
    id: "2",
    title: "Marketing Intern",
    company: "Brand Solutions",
    companyLogo:
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
    location: "Kumasi",
    type: "onsite",
    contractType: "internship",
    duration: "6 months",
    stipend: "GHS 2,000/month",
    description:
      "Help us create impactful marketing campaigns and engaging content that resonates with our target audience. You will work closely with our marketing team to develop strategies, manage social media accounts, and analyze campaign performance.",
    requirements: [
      "Marketing, Communications, or Business student",
      "Strong written and verbal communication skills",
      "Experience with social media platforms",
      "Creative mindset with attention to detail",
      "Basic knowledge of design tools is a plus",
    ],
    responsibilities: [
      "Create engaging social media content",
      "Assist in planning and executing marketing campaigns",
      "Conduct market research and competitor analysis",
      "Help manage brand partnerships and collaborations",
      "Track and report on campaign metrics",
    ],
    benefits: [
      "Monthly stipend",
      "Creative work environment",
      "Portfolio building opportunities",
      "Networking events",
      "Professional development workshops",
    ],
    skills: [
      "Social Media",
      "Content Creation",
      "Analytics",
      "Canva",
      "Copywriting",
    ],
    status: "active",
    applications: 32,
    postedAt: new Date("2024-03-05"),
    deadline: new Date("2024-04-20"),
    contactEmail: "hr@brandsolutions.com",
    department: "Marketing",
  },
  {
    id: "3",
    title: "Data Analyst Intern",
    company: "DataMinds",
    companyLogo:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop",
    location: "Remote",
    type: "remote",
    contractType: "internship",
    duration: "4 months",
    stipend: "GHS 3,000/month",
    description:
      "Work with our data team to analyze trends, build dashboards, and derive actionable insights from large datasets. This role offers exposure to real-world data challenges and the opportunity to work with modern analytics tools.",
    requirements: [
      "Statistics, Mathematics, or Computer Science background",
      "Proficiency in Python or R",
      "Experience with SQL databases",
      "Understanding of statistical analysis",
      "Strong analytical and critical thinking skills",
    ],
    responsibilities: [
      "Clean and preprocess data for analysis",
      "Build interactive dashboards and visualizations",
      "Conduct statistical analysis and create reports",
      "Collaborate with teams to understand data needs",
      "Present findings to stakeholders",
    ],
    benefits: [
      "Competitive remote stipend",
      "Flexible schedule",
      "Access to premium data tools",
      "Weekly mentorship sessions",
      "Work from anywhere",
    ],
    skills: ["Python", "SQL", "Tableau", "Excel", "Statistics"],
    status: "active",
    applications: 28,
    postedAt: new Date("2024-03-08"),
    deadline: new Date("2024-04-25"),
    contactEmail: "internships@dataminds.io",
    website: "https://dataminds.io",
    department: "Analytics",
  },
  {
    id: "4",
    title: "Graphic Design Intern",
    company: "Creative Hub",
    location: "Takoradi",
    type: "onsite",
    contractType: "internship",
    duration: "3 months",
    description:
      "Design marketing materials, brand assets, and digital content for various clients. You will work on diverse projects ranging from social media graphics to print materials, gaining experience across different design disciplines.",
    requirements: [
      "Design portfolio showcasing creative work",
      "Proficiency in Adobe Creative Suite",
      "Understanding of design principles and typography",
      "Ability to work on multiple projects simultaneously",
      "Open to feedback and iteration",
    ],
    responsibilities: [
      "Create visual content for social media and web",
      "Design marketing collateral and brand materials",
      "Assist in developing brand guidelines",
      "Collaborate with the creative team on client projects",
      "Maintain organized design files and assets",
    ],
    benefits: [
      "Portfolio building with real client work",
      "Creative studio environment",
      "Access to premium design software",
      "Industry mentorship",
      "Exhibition opportunities",
    ],
    skills: ["Photoshop", "Illustrator", "Figma", "InDesign", "Typography"],
    status: "pending",
    applications: 0,
    postedAt: new Date("2024-03-10"),
    deadline: new Date("2024-04-30"),
    contactEmail: "design@creativehub.gh",
    contactPhone: "+233 24 567 8901",
    department: "Design",
  },
  {
    id: "5",
    title: "Finance Intern",
    company: "FinanceGh",
    companyLogo:
      "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=100&h=100&fit=crop",
    location: "Accra",
    type: "hybrid",
    contractType: "alternance",
    duration: "6 months",
    stipend: "GHS 2,800/month",
    description:
      "Support financial analysis, reporting, and budgeting activities. Gain exposure to corporate finance operations and learn from experienced professionals in the financial services industry.",
    requirements: [
      "Accounting, Finance, or Economics student",
      "Advanced Excel skills required",
      "Understanding of financial statements",
      "Strong attention to detail",
      "Good numerical and analytical abilities",
    ],
    responsibilities: [
      "Assist in preparing financial reports and analyses",
      "Support budgeting and forecasting activities",
      "Help maintain financial records and documentation",
      "Participate in audit preparation",
      "Conduct research on market trends",
    ],
    benefits: [
      "Competitive stipend",
      "Professional certification support",
      "Networking with industry professionals",
      "Structured learning program",
      "Performance bonus opportunity",
    ],
    skills: ["Excel", "Financial Analysis", "QuickBooks", "SAP", "Reporting"],
    status: "inactive",
    applications: 67,
    postedAt: new Date("2024-02-15"),
    deadline: new Date("2024-03-15"),
    contactEmail: "careers@financegh.com",
    website: "https://financegh.com",
    department: "Finance",
  },
];

const typeConfig = {
  remote: {
    label: "Remote",
    className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  },
  onsite: {
    label: "On-site",
    className: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  },
  hybrid: {
    label: "Hybrid",
    className: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  },
};

const contractTypeConfig = {
  internship: {
    label: "Internship",
    className: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  },
  fulltime: {
    label: "Permanent Job",
    className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  },
  alternance: {
    label: "Alternance",
    className: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  },
};

const statusConfig = {
  active: {
    label: "Active",
    icon: CheckCircle2,
    className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  },
  pending: {
    label: "Pending",
    icon: AlertCircle,
    className: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  },
  inactive: {
    label: "Closed",
    icon: XCircle,
    className: "bg-muted text-muted-foreground border-border",
  },
};

export default function InternshipsPage() {
  const [internships, setInternships] = useState(mockInternships);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingInternship, setEditingInternship] = useState<Internship | null>(
    null,
  );
  const [viewingInternship, setViewingInternship] = useState<Internship | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [contractFilter, setContractFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const activeCount = internships.filter((i) => i.status === "active").length;
  const pendingCount = internships.filter((i) => i.status === "pending").length;
  const totalApplications = internships.reduce(
    (acc, i) => acc + i.applications,
    0,
  );

  const filteredInternships = internships.filter((internship) => {
    const matchesSearch =
      internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || internship.status === statusFilter;
    const matchesType = typeFilter === "all" || internship.type === typeFilter;
    const matchesContract =
      contractFilter === "all" || internship.contractType === contractFilter;

    return matchesSearch && matchesStatus && matchesType && matchesContract;
  });

  const handleAdd = () => {
    setEditingInternship(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (item: Internship) => {
    setEditingInternship(item);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setInternships(internships.filter((i) => i.id !== id));
    setViewingInternship(null);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newInternship: Internship = {
      id: editingInternship?.id || Date.now().toString(),
      title: formData.get("title") as string,
      company: formData.get("company") as string,
      location: formData.get("location") as string,
      type: formData.get("type") as Internship["type"],
      contractType: formData.get(
        "contractType",
      ) as Internship["contractType"],
      duration: formData.get("duration") as string,
      stipend: (formData.get("stipend") as string) || undefined,
      description: formData.get("description") as string,
      requirements: (formData.get("requirements") as string)
        .split("\n")
        .filter((r) => r.trim()),
      responsibilities: (formData.get("responsibilities") as string)
        .split("\n")
        .filter((r) => r.trim()),
      benefits: (formData.get("benefits") as string)
        .split("\n")
        .filter((r) => r.trim()),
      skills: (formData.get("skills") as string)
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s),
      status: formData.get("status") as Internship["status"],
      applications: editingInternship?.applications || 0,
      postedAt: editingInternship?.postedAt || new Date(),
      deadline: new Date(formData.get("deadline") as string),
      contactEmail: (formData.get("contactEmail") as string) || undefined,
      contactPhone: (formData.get("contactPhone") as string) || undefined,
      website: (formData.get("website") as string) || undefined,
      department: (formData.get("department") as string) || undefined,
    };

    if (editingInternship) {
      setInternships(
        internships.map((i) =>
          i.id === editingInternship.id ? newInternship : i,
        ),
      );
    } else {
      setInternships([newInternship, ...internships]);
    }

    setIsDialogOpen(false);
  };

  return (
    <DashboardLayout
      title="Internships Management"
      breadcrumbs={[{ label: "Internships" }]}
    >
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card className="relative overflow-hidden border-border bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full -mr-10 -mt-10" />
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 ring-1 ring-primary/20">
                <Briefcase className="size-6 text-primary" />
              </div>
              <div>
                <p className="text-3xl font-bold">{internships.length}</p>
                <p className="text-sm text-muted-foreground">Total Listings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-border bg-gradient-to-br from-emerald-500/5 to-emerald-500/10">
          <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full -mr-10 -mt-10" />
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20">
                <CheckCircle2 className="size-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-3xl font-bold">{activeCount}</p>
                <p className="text-sm text-muted-foreground">Active Listings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-border bg-gradient-to-br from-amber-500/5 to-amber-500/10">
          <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/10 rounded-full -mr-10 -mt-10" />
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-amber-500/10 ring-1 ring-amber-500/20">
                <AlertCircle className="size-6 text-amber-600" />
              </div>
              <div>
                <p className="text-3xl font-bold">{pendingCount}</p>
                <p className="text-sm text-muted-foreground">Pending Review</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-border bg-gradient-to-br from-blue-500/5 to-blue-500/10">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full -mr-10 -mt-10" />
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10 ring-1 ring-blue-500/20">
                <Users className="size-6 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-bold">{totalApplications}</p>
                <p className="text-sm text-muted-foreground">Applications</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border">
        <div className="p-6 border-b border-border">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex flex-1 gap-3 flex-wrap">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search internships..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-secondary border-border"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px] bg-secondary border-border">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Closed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px] bg-secondary border-border">
                  <SelectValue placeholder="Work Mode" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="all">All Modes</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="onsite">On-site</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>

              <Select value={contractFilter} onValueChange={setContractFilter}>
                <SelectTrigger className="w-[160px] bg-secondary border-border">
                  <SelectValue placeholder="Contract" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="all">All Contracts</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="fulltime">Permanent Job</SelectItem>
                  <SelectItem value="alternance">Alternance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleAdd}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="size-4 mr-2" />
              Post Internship
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">
                  Internship
                </TableHead>
                <TableHead className="text-muted-foreground">
                  Contract
                </TableHead>
                <TableHead className="text-muted-foreground">
                  Location
                </TableHead>
                <TableHead className="text-muted-foreground">
                  Duration
                </TableHead>
                <TableHead className="text-muted-foreground">Stipend</TableHead>
                <TableHead className="text-muted-foreground">
                  Applications
                </TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">
                  Deadline
                </TableHead>
                <TableHead className="text-muted-foreground w-[50px]" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredInternships.map((internship) => {
                const StatusIcon = statusConfig[internship.status].icon;
                const isExpired = new Date(internship.deadline) < new Date();

                return (
                  <TableRow
                    key={internship.id}
                    className="border-border cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => setViewingInternship(internship)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="size-10 rounded-lg">
                          <AvatarImage
                            src={internship.companyLogo}
                            alt={internship.company}
                          />
                          <AvatarFallback className="rounded-lg bg-primary/10 text-primary">
                            {internship.company.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">
                            {internship.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {internship.company}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          contractTypeConfig[internship.contractType].className
                        }
                      >
                        {contractTypeConfig[internship.contractType].label}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <MapPin className="size-3.5" />
                          <span>{internship.location}</span>
                        </div>
                        <Badge
                          variant="outline"
                          className={typeConfig[internship.type].className}
                        >
                          {typeConfig[internship.type].label}
                        </Badge>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1.5 text-sm">
                        <Clock className="size-3.5 text-muted-foreground" />
                        <span>{internship.duration}</span>
                      </div>
                    </TableCell>

                    <TableCell>
                      {internship.stipend ? (
                        <div className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                          <DollarSign className="size-3.5" />
                          <span>{internship.stipend}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          Unpaid
                        </span>
                      )}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <Users className="size-3.5 text-muted-foreground" />
                        <span className="font-medium">
                          {internship.applications}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="outline"
                        className={statusConfig[internship.status].className}
                      >
                        <StatusIcon className="size-3 mr-1" />
                        {statusConfig[internship.status].label}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <div
                        className={`text-sm ${isExpired ? "text-destructive" : "text-muted-foreground"}`}
                      >
                        {format(internship.deadline, "MMM d, yyyy")}
                        {isExpired && (
                          <span className="block text-xs">Expired</span>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          asChild
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                          >
                            <MoreVertical className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-popover border-border"
                        >
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              setViewingInternship(internship);
                            }}
                          >
                            <Eye className="size-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(internship);
                            }}
                          >
                            <Edit2 className="size-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(internship.id);
                            }}
                          >
                            <Trash2 className="size-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {filteredInternships.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="p-4 rounded-full bg-muted mb-4">
                <Briefcase className="size-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-1">No internships found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters
              </p>
              <Button
                onClick={handleAdd}
                variant="outline"
                className="border-border"
              >
                <Plus className="size-4 mr-2" />
                Post New Internship
              </Button>
            </div>
          )}
        </div>
      </Card>

      <Dialog
        open={!!viewingInternship}
        onOpenChange={(open) => !open && setViewingInternship(null)}
      >
        <DialogContent className="bg-card border-border sm:max-w-[900px] max-h-[90vh] overflow-hidden flex flex-col p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>{viewingInternship?.title}</DialogTitle>
            <DialogDescription>
              Full details for this internship listing
            </DialogDescription>
          </DialogHeader>

          {viewingInternship && (
            <>
              <div className="p-6 border-b border-border bg-gradient-to-r from-primary/5 via-transparent to-transparent">
                <div className="flex items-start gap-4">
                  <Avatar className="size-16 rounded-xl ring-2 ring-border">
                    <AvatarImage
                      src={viewingInternship.companyLogo}
                      alt={viewingInternship.company}
                    />
                    <AvatarFallback className="rounded-xl bg-primary/10 text-primary text-xl">
                      {viewingInternship.company.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">
                          {viewingInternship.title}
                        </h2>
                        <p className="text-lg text-muted-foreground">
                          {viewingInternship.company}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge
                          variant="outline"
                          className={
                            contractTypeConfig[viewingInternship.contractType]
                              .className
                          }
                        >
                          {
                            contractTypeConfig[viewingInternship.contractType]
                              .label
                          }
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            statusConfig[viewingInternship.status].className
                          }
                        >
                          {statusConfig[viewingInternship.status].label}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            typeConfig[viewingInternship.type].className
                          }
                        >
                          {typeConfig[viewingInternship.type].label}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="size-4" />
                        <span>{viewingInternship.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="size-4" />
                        <span>{viewingInternship.duration}</span>
                      </div>
                      {viewingInternship.stipend && (
                        <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
                          <DollarSign className="size-4" />
                          <span>{viewingInternship.stipend}</span>
                        </div>
                      )}
                      {viewingInternship.department && (
                        <div className="flex items-center gap-1.5">
                          <Building2 className="size-4" />
                          <span>{viewingInternship.department}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <FileText className="size-5 text-primary" />
                        About This Internship
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {viewingInternship.description}
                      </p>
                    </div>

                    {viewingInternship.responsibilities.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <CheckCircle2 className="size-5 text-primary" />
                          Responsibilities
                        </h3>
                        <ul className="space-y-2">
                          {viewingInternship.responsibilities.map(
                            (item, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2 text-muted-foreground"
                              >
                                <ChevronRight className="size-4 mt-0.5 text-primary shrink-0" />
                                <span>{item}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    )}

                    {viewingInternship.requirements.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <GraduationCap className="size-5 text-primary" />
                          Requirements
                        </h3>
                        <ul className="space-y-2">
                          {viewingInternship.requirements.map((item, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-muted-foreground"
                            >
                              <ChevronRight className="size-4 mt-0.5 text-primary shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {viewingInternship.benefits.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <Bookmark className="size-5 text-primary" />
                          Benefits
                        </h3>
                        <ul className="space-y-2">
                          {viewingInternship.benefits.map((item, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-muted-foreground"
                            >
                              <CheckCircle2 className="size-4 mt-0.5 text-emerald-500 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {viewingInternship.skills.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3">
                          Required Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {viewingInternship.skills.map((skill, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-secondary text-secondary-foreground"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <Card className="border-border">
                      <CardContent className="p-4 space-y-4">
                        <h4 className="font-semibold">Quick Stats</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              Applications
                            </span>
                            <span className="font-medium">
                              {viewingInternship.applications}
                            </span>
                          </div>
                          <Separator className="bg-border" />
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              Posted
                            </span>
                            <span className="font-medium">
                              {formatDistanceToNow(viewingInternship.postedAt, {
                                addSuffix: true,
                              })}
                            </span>
                          </div>
                          <Separator className="bg-border" />
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              Deadline
                            </span>
                            <span
                              className={`font-medium ${new Date(viewingInternship.deadline) < new Date() ? "text-destructive" : ""}`}
                            >
                              {format(
                                viewingInternship.deadline,
                                "MMM d, yyyy",
                              )}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-border">
                      <CardContent className="p-4 space-y-4">
                        <h4 className="font-semibold">Contact Information</h4>
                        <div className="space-y-3">
                          {viewingInternship.contactEmail && (
                            <a
                              href={`mailto:${viewingInternship.contactEmail}`}
                              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Mail className="size-4" />
                              <span className="truncate">
                                {viewingInternship.contactEmail}
                              </span>
                            </a>
                          )}
                          {viewingInternship.contactPhone && (
                            <a
                              href={`tel:${viewingInternship.contactPhone}`}
                              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Phone className="size-4" />
                              <span>{viewingInternship.contactPhone}</span>
                            </a>
                          )}
                          {viewingInternship.website && (
                            <a
                              href={viewingInternship.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Globe className="size-4" />
                              <span>Visit Website</span>
                              <ExternalLink className="size-3" />
                            </a>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    <div className="space-y-2">
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        <Send className="size-4 mr-2" />
                        View Applications
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-border"
                        onClick={() => {
                          setViewingInternship(null);
                          handleEdit(viewingInternship);
                        }}
                      >
                        <Edit2 className="size-4 mr-2" />
                        Edit Listing
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-border"
                      >
                        <Share2 className="size-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-card border-border sm:max-w-[800px] max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>
              {editingInternship ? "Edit Internship" : "Post New Internship"}
            </DialogTitle>
            <DialogDescription>
              {editingInternship
                ? "Update the internship details below."
                : "Fill in the details to post a new internship opportunity."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave} className="flex-1 overflow-y-auto">
            <div className="grid gap-4 py-4 px-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    defaultValue={editingInternship?.title}
                    placeholder="Software Engineering Intern"
                    className="bg-secondary border-border"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    name="company"
                    defaultValue={editingInternship?.company}
                    placeholder="Company Name"
                    className="bg-secondary border-border"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    name="location"
                    defaultValue={editingInternship?.location}
                    placeholder="City or Remote"
                    className="bg-secondary border-border"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="type">Work Mode *</Label>
                  <Select
                    name="type"
                    defaultValue={editingInternship?.type || "onsite"}
                  >
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue placeholder="Select work mode" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="onsite">On-site</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="contractType">Contract Type *</Label>
                  <Select
                    name="contractType"
                    defaultValue={
                      editingInternship?.contractType || "internship"
                    }
                  >
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue placeholder="Select contract type" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="fulltime">Permanent Job</SelectItem>
                      <SelectItem value="alternance">Alternance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    name="department"
                    defaultValue={editingInternship?.department}
                    placeholder="Engineering"
                    className="bg-secondary border-border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="duration">Duration *</Label>
                  <Input
                    id="duration"
                    name="duration"
                    defaultValue={editingInternship?.duration}
                    placeholder="3 months"
                    className="bg-secondary border-border"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="stipend">Stipend</Label>
                  <Input
                    id="stipend"
                    name="stipend"
                    defaultValue={editingInternship?.stipend}
                    placeholder="GHS 2,500/month"
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="deadline">Deadline *</Label>
                  <Input
                    id="deadline"
                    name="deadline"
                    type="date"
                    defaultValue={
                      editingInternship?.deadline
                        ? format(editingInternship.deadline, "yyyy-MM-dd")
                        : ""
                    }
                    className="bg-secondary border-border"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select
                    name="status"
                    defaultValue={editingInternship?.status || "active"}
                  >
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="inactive">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={editingInternship?.description}
                  placeholder="Describe the role, team, and what the candidate will learn or work on..."
                  className="bg-secondary border-border min-h-[100px]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="responsibilities">
                    Responsibilities (one per line)
                  </Label>
                  <Textarea
                    id="responsibilities"
                    name="responsibilities"
                    defaultValue={editingInternship?.responsibilities?.join(
                      "\n",
                    )}
                    placeholder={"Develop web applications\nCollaborate with team\nWrite documentation"}
                    className="bg-secondary border-border min-h-[100px]"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="requirements">
                    Requirements (one per line) *
                  </Label>
                  <Textarea
                    id="requirements"
                    name="requirements"
                    defaultValue={editingInternship?.requirements?.join("\n")}
                    placeholder={"Computer Science student\nJavaScript knowledge\nProblem-solving skills"}
                    className="bg-secondary border-border min-h-[100px]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="benefits">Benefits (one per line)</Label>
                  <Textarea
                    id="benefits"
                    name="benefits"
                    defaultValue={editingInternship?.benefits?.join("\n")}
                    placeholder={"Competitive stipend\nFlexible hours\nCertificate"}
                    className="bg-secondary border-border min-h-[80px]"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="skills">Skills (comma-separated)</Label>
                  <Textarea
                    id="skills"
                    name="skills"
                    defaultValue={editingInternship?.skills?.join(", ")}
                    placeholder="JavaScript, React, Node.js, Git"
                    className="bg-secondary border-border min-h-[80px]"
                  />
                </div>
              </div>

              <Separator className="bg-border" />

              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    defaultValue={editingInternship?.contactEmail}
                    placeholder="careers@company.com"
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    name="contactPhone"
                    defaultValue={editingInternship?.contactPhone}
                    placeholder="+233 20 123 4567"
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    defaultValue={editingInternship?.website}
                    placeholder="https://company.com"
                    className="bg-secondary border-border"
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="sticky bottom-0 bg-card pt-4 border-t border-border mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="border-border"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {editingInternship ? "Save Changes" : "Post Internship"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}