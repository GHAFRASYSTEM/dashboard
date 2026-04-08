"use client";

import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeft, Clock, CreditCard, FileText } from "lucide-react";

import { DashboardLayout } from "../../components/dashboard-layout";
import { Button } from "../../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

import {
  mockActivities,
  mockContributions,
  mockMembers,
} from "./data/mock-members";
import type { Contribution, Activity, Member } from "./types/members";

import { MemberProfileHeader } from "./components/member-profile-header";
import { MemberContributionsTab } from "./components/member-contributions-tab";
import { MemberActivityTab } from "./components/member-activity-tab";
import { MemberDocumentsTab } from "./components/member-documents-tab";
import { MemberQuickStats } from "./components/member-quick-stats";
import { MemberContactCard } from "./components/member-contact-card";
import { MemberPersonalDetailsCard } from "./components/member-personal-details-card";
import { MemberEmergencyContactCard } from "./components/member-emergency-contact-card";
import { MemberEditDialog } from "./components/member-edit-dialog";
import { MemberMessageDialog } from "./components/member-message-dialog";
import { DeleteMemberDialog } from "./components/delete-member-dialog";

export default function MemberDetailPage() {
  const params = useParams();
  const navigate = useNavigate();

  const fallbackMember = mockMembers[0];
  const selectedMember =
    mockMembers.find((member) => member.id === params.id) ?? fallbackMember;

  const [member, setMember] = useState<Member>(selectedMember);
  const [contributions] = useState<Contribution[]>(mockContributions);
  const [activities] = useState<Activity[]>(mockActivities);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);

  const [memberImage, setMemberImage] = useState(member.image || "");
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: member.name,
    email: member.email,
    phone: member.phone,
    location: member.location,
    address: member.address || "",
    position: member.position || "",
    department: member.department || "",
    bio: member.bio || "",
    occupation: member.occupation || "",
    employer: member.employer || "",
    status: member.status,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setMemberImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    setMember((prev) => ({
      ...prev,
      ...formData,
      image: memberImage,
    }));
    setIsEditDialogOpen(false);
  };

  const handleDelete = () => {
    navigate("/members");
  };

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(member.membershipId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleSendMessage = () => {
    setMessage("");
    setIsMessageDialogOpen(false);
  };

  return (
    <DashboardLayout
      title="Member Profile"
      breadcrumbs={[
        { label: "Members", href: "/members" },
        { label: member.name },
      ]}
    >
      <div className="mb-6">
        <Link to="/members">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="size-4" />
            Back to Members
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <MemberProfileHeader
            member={member}
            copied={copied}
            onCopyId={handleCopyId}
            onMessage={() => setIsMessageDialogOpen(true)}
            onEdit={() => setIsEditDialogOpen(true)}
            onDelete={() => setIsDeleteDialogOpen(true)}
          />

          <Tabs defaultValue="contributions" className="space-y-4">
            <TabsList className="bg-card border border-border">
              <TabsTrigger value="contributions" className="gap-2">
                <CreditCard className="size-4" />
                Contributions
              </TabsTrigger>

              <TabsTrigger value="activity" className="gap-2">
                <Clock className="size-4" />
                Activity
              </TabsTrigger>

              <TabsTrigger value="documents" className="gap-2">
                <FileText className="size-4" />
                Documents
              </TabsTrigger>
            </TabsList>

            <TabsContent value="contributions">
              <MemberContributionsTab contributions={contributions} />
            </TabsContent>

            <TabsContent value="activity">
              <MemberActivityTab activities={activities} />
            </TabsContent>

            <TabsContent value="documents">
              <MemberDocumentsTab />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <MemberQuickStats member={member} contributions={contributions} />
          <MemberContactCard member={member} />
          <MemberPersonalDetailsCard member={member} />
          <MemberEmergencyContactCard contact={member.emergencyContact} />
        </div>
      </div>

      <MemberEditDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        formData={formData}
        setFormData={setFormData}
        memberImage={memberImage}
        setMemberImage={setMemberImage}
        onImageUpload={handleImageUpload}
        onSave={handleSave}
      />

      <MemberMessageDialog
        open={isMessageDialogOpen}
        onOpenChange={setIsMessageDialogOpen}
        member={member}
        message={message}
        setMessage={setMessage}
        onSend={handleSendMessage}
      />

      <DeleteMemberDialog
        member={isDeleteDialogOpen ? member : null}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
      />
    </DashboardLayout>
  );
}
