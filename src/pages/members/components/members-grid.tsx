import { Link }   from 'react-router-dom';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Badge }       from '../../../components/ui/badge';
import { Card, CardContent } from '../../../components/ui/card';
import { ChevronRight, MapPin, Clock } from 'lucide-react';
import { cn }          from '../../../lib/utils';
import type { Member } from '../types/members';
import { getInitials, getVerifiedConfig, getRoleConfig } from '../utils/member-utils';
import { MemberActions } from './MemberActions';

interface Props {
  members:  Member[];
  onEdit:   (m: Member) => void;
  onDelete: (m: Member) => void;
}

export function MembersGrid({ members, onEdit, onDelete }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {members.map(member => {
        const vc = getVerifiedConfig(member.is_verified);
        const rc = getRoleConfig(member.role);

        return (
          <Link key={member.id} to={`/members/${member.id}`}>
            <Card className="group h-full cursor-pointer overflow-hidden border-border transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
              <CardContent className="p-0">
                <div className="relative h-28 bg-gradient-to-br from-primary/20 to-primary/5">
                  <div className="absolute top-2 right-2">
                    <MemberActions member={member} stopLink onEdit={onEdit} onDelete={onDelete} />
                  </div>
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                    <div className="relative">
                      <Avatar className="size-20 border-4 border-card shadow-xl">
                        <AvatarImage src={member.photo_url ?? ''} alt={member.name} className="object-cover" />
                        <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className={cn('absolute bottom-1 right-1 size-3.5 rounded-full border-2 border-card', vc.dot)} />
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-12 text-center">
                  <h3 className="font-semibold transition-colors group-hover:text-primary">{member.name}</h3>
                  <p className="mb-2 text-xs text-muted-foreground">{member.email}</p>

                  <div className="mb-2 flex flex-wrap justify-center gap-1.5">
                    <Badge variant="outline" className={vc.badge}>{vc.label}</Badge>
                    <Badge variant="outline" className={rc.badge}>{rc.label}</Badge>
                  </div>

                  <div className="space-y-1 text-xs text-muted-foreground">
                    {member.city && (
                      <p className="flex items-center justify-center gap-1">
                        <MapPin className="size-3" />{member.city}
                        {member.region && ` · ${member.region}`}
                      </p>
                    )}
                    <p className="flex items-center justify-center gap-1">
                      <Clock className="size-3" />
                      Since {member.member_since
                        ? format(new Date(member.member_since), 'MMM yyyy')
                        : '—'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border bg-muted/30 px-4 py-2">
                  <span className="text-xs text-muted-foreground">
                    {member.member_type} · {member.gender ?? '—'}
                  </span>
                  <ChevronRight className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}