import { useState,useEffect }        from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/dashboard-layout';
import { Button }          from '../../components/ui/button';
import { Badge }           from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Switch }          from '../../components/ui/switch';
import { Label }           from '../../components/ui/label';
import {
  ArrowLeft, Mail, MessageCircle,
  Briefcase, ShieldCheck, Trash2, Edit2,
} from 'lucide-react';
import { useMember }       from '../../hooks/useMembers';
import { membersApi } from '../../api/members';
import { whatsappUrl } from '../../utils/phone';
import {
  getInitials, getVerifiedConfig, getRoleConfig,
  formatPhone, formatDate, formatMemberSince,
} from './utils/member-utils';
import { MemberEditDialog } from './components/member-edit-dialog';
import { DeleteMemberDialog } from './components/delete-member-dialog';



export default function MemberDetailPage() {
  const { id }      = useParams<{ id: string }>();
  const navigate    = useNavigate();
  const { member, loading, error, update, toggleVerify } = useMember(id!);

  console.log(member)

  const [editOpen,   setEditOpen]   = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [verifying,  setVerifying]  = useState(false);

const [formData, setFormData] = useState({
  name: '',
  email: '',
  ghana_phone: '',
  french_phone: '',
  city: '',
  region: '',
  gender: '',
  occupation: '',
  role: '',
  member_type: '',
})

const [memberImage, setMemberImage]   = useState('')
const [imageFile,   setImageFile]     = useState<File | null>(null)

useEffect(() => {
  if (member) {
    setFormData({
      name:        member.name        || '',
      email:       member.email       || '',
      ghana_phone: member.ghana_phone || '',
      french_phone:member.french_phone|| '',
      city:        member.city        || '',
      region:      member.region      || '',
      gender:      member.gender      || '',
      occupation:  member.occupation  || '',
      role:        member.role        || 'member',
      member_type: member.member_type || 'full',
    })
    setMemberImage(member.photo_url || '')
  }
}, [member])

const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (file) {
    setImageFile(file)
    setMemberImage(URL.createObjectURL(file))
  }
}

  if (loading) return (
    <DashboardLayout title="Member Profile" breadcrumbs={[{ label: 'Members', href: '/members' }, { label: '…' }]}>
      <div className="py-16 text-center text-muted-foreground">Loading…</div>
    </DashboardLayout>
  );

  if (error || !member) return (
    <DashboardLayout title="Member Profile" breadcrumbs={[{ label: 'Members', href: '/members' }, { label: 'Not found' }]}>
      <div className="py-16 text-center text-destructive">{error ?? 'Member not found'}</div>
    </DashboardLayout>
  );

  const vc = getVerifiedConfig(member.is_verified);
  const rc = getRoleConfig(member.role);

  // Ghana/France WhatsApp links — same normalization used across the
  // pickup pages, so "0…", "233…", "+233…" (and the FR equivalents) all
  // resolve to the same correct wa.me link regardless of how it was typed.
  const ghanaWhatsapp  = whatsappUrl(member.ghana_phone,  'GH');
  const franceWhatsapp = whatsappUrl(member.french_phone, 'FR');

  const handleToggleVerify = async (checked: boolean) => {
    setVerifying(true);
    try { await toggleVerify(checked); }
    finally { setVerifying(false); }
  };

  const handleDelete = async () => {
    await membersApi.remove(member.id);
    navigate('/members');
  };

  
  return (
    <DashboardLayout
      title="Member Profile"
      breadcrumbs={[
        { label: 'Members', href: '/members' },
        { label: member.name },
      ]}
    >
      <div className="mb-6">
        <Link to="/members">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="size-4" />Back to Members
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">

        {/* ── Left column ───────────────────────────────────────── */}
        <div className="space-y-6 lg:col-span-2">

          {/* Profile header */}
          <Card className="overflow-hidden border-border">
            <div className="relative h-36 bg-linear-to-br from-primary/30 via-primary/20 to-primary/5" />
            <CardContent className="relative pt-0 pb-6">
              <div className="absolute -top-14 left-6">
                <div className="relative">
                  <Avatar className="size-28 border-4 border-card shadow-xl">
                    <AvatarImage src={member.photo_url ?? ''} alt={member.name} className="object-cover" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-4xl">
                      {getInitials(member.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute bottom-2 right-2 size-4 rounded-full border-2 border-card ${vc.dot}`} />
                </div>
              </div>

              <div className="mb-6 flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setEditOpen(true)}>
                  <Edit2 className="mr-2 size-4" />Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => setDeleteOpen(true)}>
                  <Trash2 className="mr-2 size-4" />Remove
                </Button>
              </div>

              <div className="mt-4">
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-bold">{member.name}</h1>
                  <Badge variant="outline" className={vc.badge}>{vc.label}</Badge>
                  <Badge variant="outline" className={rc.badge}>{rc.label}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{member.email}</p>
                {member.occupation && (
                  <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <Briefcase className="size-3" />{member.occupation}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Verify toggle */}
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-semibold">Membership Verification</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {member.is_verified
                      ? 'This member has been verified by an admin.'
                      : 'Toggle to verify this member\'s account.'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className={`size-5 ${member.is_verified ? 'text-emerald-500' : 'text-muted-foreground'}`} />
                  <Switch
                    checked={member.is_verified}
                    onCheckedChange={handleToggleVerify}
                    disabled={verifying}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* ── Right column ──────────────────────────────────────── */}
        <div className="space-y-6">

          {/* Contact */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <a href={`mailto:${member.email}`}
                className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-muted/30 transition-colors">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Mail className="size-4 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="truncate text-sm font-medium">{member.email}</p>
                </div>
              </a>

              {member.ghana_phone && (
                ghanaWhatsapp ? (
                  <a href={ghanaWhatsapp} target="_blank" rel="noreferrer"
                    title="Message on WhatsApp"
                    className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-[#25D366]/10 transition-colors">
                    <div className="rounded-lg bg-[#25D366]/15 p-2">
                      <MessageCircle className="size-4 text-[#1DA851]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">🇬🇭 Ghana · WhatsApp</p>
                      <p className="text-sm font-medium">{formatPhone(member.ghana_phone)}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                    <div className="rounded-lg bg-muted p-2">
                      <MessageCircle className="size-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">🇬🇭 Ghana</p>
                      <p className="text-sm font-medium">{formatPhone(member.ghana_phone)}</p>
                    </div>
                  </div>
                )
              )}

              {member.french_phone && (
                franceWhatsapp ? (
                  <a href={franceWhatsapp} target="_blank" rel="noreferrer"
                    title="Message on WhatsApp"
                    className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-[#25D366]/10 transition-colors">
                    <div className="rounded-lg bg-[#25D366]/15 p-2">
                      <MessageCircle className="size-4 text-[#1DA851]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">🇫🇷 France · WhatsApp</p>
                      <p className="text-sm font-medium">{formatPhone(member.french_phone)}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                    <div className="rounded-lg bg-muted p-2">
                      <MessageCircle className="size-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">🇫🇷 France</p>
                      <p className="text-sm font-medium">{formatPhone(member.french_phone)}</p>
                    </div>
                  </div>
                )
              )}
            </CardContent>
          </Card>

          {/* Personal details */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: 'Region',       value: member.region },
                { label: 'City',         value: member.city },
                { label: 'Gender',       value: member.gender?.replace('_', ' ') },
                { label: 'Occupation',   value: member.occupation },
                { label: 'Member type',  value: member.member_type },
                { label: 'Member since', value: formatMemberSince(member.member_since) },
                { label: 'Joined',       value: formatDate(member.created_at) },
              ].map(({ label, value }) => value ? (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{label}</span>
                  <span className="text-sm font-medium capitalize">{value}</span>
                </div>
              ) : null)}
            </CardContent>
          </Card>

        </div>
      </div>

<MemberEditDialog
  open={editOpen}
  onOpenChange={setEditOpen}
  formData={formData}
  setFormData={setFormData}
  memberImage={memberImage}
  setMemberImage={setMemberImage}
  onImageUpload={handleImageUpload}
onSave={async () => {
  let photo_url: string | undefined = memberImage.startsWith('blob:') ? undefined : memberImage

  if (imageFile) {
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload  = () => resolve((reader.result as string).split(',')[1])
      reader.onerror = reject
      reader.readAsDataURL(imageFile)
    })
    photo_url = base64
  }

  await update({
    name:         formData.name,
    email:        formData.email,
    ghana_phone:  formData.ghana_phone,
    french_phone: formData.french_phone,
    city:         formData.city,
    region:       formData.region        as 'Accra' | 'Kumasi' | 'Tamale' | 'Sunyani' | null,
    gender:       formData.gender        as 'male' | 'female' | 'prefer_not_to_say' | null,
    occupation:   formData.occupation,
    role:         formData.role          as 'member' | 'admin' | 'moderator',
    member_type:  formData.member_type   as 'full' | 'associate' | 'honorary',
    ...(photo_url !== undefined ? { photo_url } : {}),
  })

  setImageFile(null)
  setEditOpen(false)
}}
/>

      <DeleteMemberDialog
        member={deleteOpen ? member : null}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </DashboardLayout>
  );
}