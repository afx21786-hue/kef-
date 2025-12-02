import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Rocket,
  Users,
  Mail,
  MessageSquare,
  Building,
  GraduationCap,
  Briefcase,
  Plus,
  Trash2,
  Edit,
  Eye,
  Send,
  Loader2,
  LogOut,
  RefreshCw
} from 'lucide-react';
import type { 
  Resource, Program, Event, MembershipPlan,
  ApplyFormSubmission, RegisterFormSubmission, ConsultationSubmission,
  AdvisorySessionSubmission, CampusInviteSubmission, ContactSubmission
} from '@shared/schema';

type TabType = 'dashboard' | 'resources' | 'programs' | 'events' | 'membership-plans' | 
  'apply-forms' | 'register-forms' | 'consultations' | 'advisory-sessions' | 
  'campus-invites' | 'contact-general' | 'contact-partnership' | 'contact-corporate' | 'contact-campus';

export default function Admin() {
  const { user, isLoading, isAdmin } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [replyData, setReplyData] = useState({ subject: '', body: '', recipientEmail: '', submissionId: '', submissionType: '' });

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You need admin privileges to access this page.",
        variant: "destructive",
      });
      setLocation('/');
    }
  }, [isLoading, isAdmin, setLocation, toast]);

  const { data: resources = [], refetch: refetchResources } = useQuery<Resource[]>({
    queryKey: ['/api/admin/resources'],
    enabled: isAdmin,
  });

  const { data: programs = [], refetch: refetchPrograms } = useQuery<Program[]>({
    queryKey: ['/api/admin/programs'],
    enabled: isAdmin,
  });

  const { data: events = [], refetch: refetchEvents } = useQuery<Event[]>({
    queryKey: ['/api/admin/events'],
    enabled: isAdmin,
  });

  const { data: membershipPlans = [], refetch: refetchPlans } = useQuery<MembershipPlan[]>({
    queryKey: ['/api/admin/membership-plans'],
    enabled: isAdmin,
  });

  const { data: applyForms = [] } = useQuery<ApplyFormSubmission[]>({
    queryKey: ['/api/admin/forms/apply'],
    enabled: isAdmin,
  });

  const { data: registerForms = [] } = useQuery<RegisterFormSubmission[]>({
    queryKey: ['/api/admin/forms/register'],
    enabled: isAdmin,
  });

  const { data: consultations = [] } = useQuery<ConsultationSubmission[]>({
    queryKey: ['/api/admin/forms/consultation'],
    enabled: isAdmin,
  });

  const { data: advisorySessions = [] } = useQuery<AdvisorySessionSubmission[]>({
    queryKey: ['/api/admin/forms/advisory'],
    enabled: isAdmin,
  });

  const { data: campusInvites = [] } = useQuery<CampusInviteSubmission[]>({
    queryKey: ['/api/admin/forms/campus-invite'],
    enabled: isAdmin,
  });

  const { data: contactGeneral = [] } = useQuery<ContactSubmission[]>({
    queryKey: ['/api/admin/contact', { category: 'general' }],
    enabled: isAdmin,
  });

  const { data: contactPartnership = [] } = useQuery<ContactSubmission[]>({
    queryKey: ['/api/admin/contact', { category: 'partnership' }],
    enabled: isAdmin,
  });

  const { data: contactCorporate = [] } = useQuery<ContactSubmission[]>({
    queryKey: ['/api/admin/contact', { category: 'corporate' }],
    enabled: isAdmin,
  });

  const { data: contactCampus = [] } = useQuery<ContactSubmission[]>({
    queryKey: ['/api/admin/contact', { category: 'campus' }],
    enabled: isAdmin,
  });

  const createMutation = useMutation({
    mutationFn: async ({ type, data }: { type: string; data: any }) => {
      const response = await apiRequest('POST', `/api/admin/${type}`, data);
      return response.json();
    },
    onSuccess: (_, variables) => {
      toast({ title: "Success", description: "Item created successfully" });
      setIsFormOpen(false);
      setEditingItem(null);
      queryClient.invalidateQueries({ queryKey: [`/api/admin/${variables.type}`] });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ type, id, data }: { type: string; id: string; data: any }) => {
      const response = await apiRequest('PATCH', `/api/admin/${type}/${id}`, data);
      return response.json();
    },
    onSuccess: (_, variables) => {
      toast({ title: "Success", description: "Item updated successfully" });
      setIsFormOpen(false);
      setEditingItem(null);
      queryClient.invalidateQueries({ queryKey: [`/api/admin/${variables.type}`] });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ type, id }: { type: string; id: string }) => {
      const response = await apiRequest('DELETE', `/api/admin/${type}/${id}`);
      return response.json();
    },
    onSuccess: (_, variables) => {
      toast({ title: "Success", description: "Item deleted successfully" });
      queryClient.invalidateQueries({ queryKey: [`/api/admin/${variables.type}`] });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const replyMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest('POST', '/api/admin/email-reply', data);
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Reply sent successfully" });
      setIsReplyOpen(false);
      setReplyData({ subject: '', body: '', recipientEmail: '', submissionId: '', submissionType: '' });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const handleReply = (email: string, id: string, type: string) => {
    setReplyData({ subject: '', body: '', recipientEmail: email, submissionId: id, submissionType: type });
    setIsReplyOpen(true);
  };

  const sendReply = () => {
    replyMutation.mutate(replyData);
  };

  if (isLoading) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </main>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const stats = {
    resources: resources.length,
    programs: programs.length,
    events: events.length,
    plans: membershipPlans.length,
    pendingForms: applyForms.filter(f => f.status === 'pending').length +
      registerForms.filter(f => f.status === 'pending').length +
      consultations.filter(f => f.status === 'pending').length +
      advisorySessions.filter(f => f.status === 'pending').length +
      campusInvites.filter(f => f.status === 'pending').length,
    pendingContacts: contactGeneral.filter(c => c.status === 'pending').length +
      contactPartnership.filter(c => c.status === 'pending').length +
      contactCorporate.filter(c => c.status === 'pending').length +
      contactCampus.filter(c => c.status === 'pending').length,
  };

  const renderStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      pending: 'secondary',
      approved: 'default',
      rejected: 'destructive',
      completed: 'default',
    };
    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
  };

  const renderSubmissionTable = (
    submissions: any[],
    type: string,
    columns: { key: string; label: string }[]
  ) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div>
          <CardTitle className="text-lg">Submissions</CardTitle>
          <CardDescription>{submissions.length} total submissions</CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => queryClient.invalidateQueries({ queryKey: [`/api/admin/forms/${type}`] })}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map(col => (
                  <TableHead key={col.key}>{col.label}</TableHead>
                ))}
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((item) => (
                <TableRow key={item.id}>
                  {columns.map(col => (
                    <TableCell key={col.key} className="max-w-[150px] truncate">
                      {item[col.key]}
                    </TableCell>
                  ))}
                  <TableCell>{renderStatusBadge(item.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleReply(item.email, item.id, type)}
                        data-testid={`button-reply-${item.id}`}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {submissions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={columns.length + 2} className="text-center text-muted-foreground py-8">
                    No submissions yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );

  const renderCrudTable = (
    items: any[],
    type: string,
    columns: { key: string; label: string }[]
  ) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div>
          <CardTitle className="text-lg capitalize">{type}</CardTitle>
          <CardDescription>{items.length} total items</CardDescription>
        </div>
        <Button onClick={() => { setEditingItem({}); setIsFormOpen(true); }} data-testid={`button-add-${type}`}>
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map(col => (
                  <TableHead key={col.key}>{col.label}</TableHead>
                ))}
                <TableHead>Active</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  {columns.map(col => (
                    <TableCell key={col.key} className="max-w-[200px] truncate">
                      {col.key === 'date' ? new Date(item[col.key]).toLocaleDateString() : item[col.key]}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Badge variant={item.isActive ? 'default' : 'secondary'}>
                      {item.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => { setEditingItem(item); setIsFormOpen(true); }}
                        data-testid={`button-edit-${item.id}`}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-destructive"
                        onClick={() => deleteMutation.mutate({ type, id: item.id })}
                        data-testid={`button-delete-${item.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && (
                <TableRow>
                  <TableCell colSpan={columns.length + 2} className="text-center text-muted-foreground py-8">
                    No items yet. Click "Add New" to create one.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );

  return (
    <main className="pt-20 min-h-screen bg-muted/30" data-testid="page-admin">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground">Manage your website content and submissions</p>
          </div>
          <Button variant="outline" onClick={() => window.location.href = '/api/logout'}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabType)} className="space-y-6">
          <ScrollArea className="w-full">
            <TabsList className="inline-flex h-auto p-1 bg-muted gap-1 flex-wrap">
              <TabsTrigger value="dashboard" className="gap-2">
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="resources" className="gap-2">
                <FileText className="w-4 h-4" />
                Resources
              </TabsTrigger>
              <TabsTrigger value="programs" className="gap-2">
                <Rocket className="w-4 h-4" />
                Programs
              </TabsTrigger>
              <TabsTrigger value="events" className="gap-2">
                <Calendar className="w-4 h-4" />
                Events
              </TabsTrigger>
              <TabsTrigger value="membership-plans" className="gap-2">
                <Users className="w-4 h-4" />
                Plans
              </TabsTrigger>
              <TabsTrigger value="apply-forms" className="gap-2">
                <Briefcase className="w-4 h-4" />
                Apply
              </TabsTrigger>
              <TabsTrigger value="register-forms" className="gap-2">
                <Users className="w-4 h-4" />
                Register
              </TabsTrigger>
              <TabsTrigger value="consultations" className="gap-2">
                <MessageSquare className="w-4 h-4" />
                Consultation
              </TabsTrigger>
              <TabsTrigger value="advisory-sessions" className="gap-2">
                <GraduationCap className="w-4 h-4" />
                Advisory
              </TabsTrigger>
              <TabsTrigger value="campus-invites" className="gap-2">
                <Building className="w-4 h-4" />
                Campus
              </TabsTrigger>
              <TabsTrigger value="contact-general" className="gap-2">
                <Mail className="w-4 h-4" />
                General
              </TabsTrigger>
              <TabsTrigger value="contact-partnership" className="gap-2">
                <Mail className="w-4 h-4" />
                Partnership
              </TabsTrigger>
              <TabsTrigger value="contact-corporate" className="gap-2">
                <Mail className="w-4 h-4" />
                Corporate
              </TabsTrigger>
              <TabsTrigger value="contact-campus" className="gap-2">
                <Mail className="w-4 h-4" />
                Campus Inquiry
              </TabsTrigger>
            </TabsList>
          </ScrollArea>

          <TabsContent value="dashboard">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Resources</CardTitle>
                  <FileText className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.resources}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Programs</CardTitle>
                  <Rocket className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.programs}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Events</CardTitle>
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.events}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Membership Plans</CardTitle>
                  <Users className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.plans}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Forms</CardTitle>
                  <MessageSquare className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-600">{stats.pendingForms}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Contacts</CardTitle>
                  <Mail className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-600">{stats.pendingContacts}</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resources">
            {renderCrudTable(resources, 'resources', [
              { key: 'title', label: 'Title' },
              { key: 'category', label: 'Category' },
              { key: 'description', label: 'Description' },
            ])}
          </TabsContent>

          <TabsContent value="programs">
            {renderCrudTable(programs, 'programs', [
              { key: 'title', label: 'Title' },
              { key: 'category', label: 'Category' },
              { key: 'duration', label: 'Duration' },
            ])}
          </TabsContent>

          <TabsContent value="events">
            {renderCrudTable(events, 'events', [
              { key: 'title', label: 'Title' },
              { key: 'date', label: 'Date' },
              { key: 'location', label: 'Location' },
            ])}
          </TabsContent>

          <TabsContent value="membership-plans">
            {renderCrudTable(membershipPlans, 'membership-plans', [
              { key: 'name', label: 'Name' },
              { key: 'type', label: 'Type' },
              { key: 'price', label: 'Price' },
            ])}
          </TabsContent>

          <TabsContent value="apply-forms">
            {renderSubmissionTable(applyForms, 'apply', [
              { key: 'fullName', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'phone', label: 'Phone' },
              { key: 'programInterest', label: 'Program Interest' },
            ])}
          </TabsContent>

          <TabsContent value="register-forms">
            {renderSubmissionTable(registerForms, 'register', [
              { key: 'fullName', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'membershipType', label: 'Membership Type' },
              { key: 'organization', label: 'Organization' },
            ])}
          </TabsContent>

          <TabsContent value="consultations">
            {renderSubmissionTable(consultations, 'consultation', [
              { key: 'fullName', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'consultationType', label: 'Type' },
              { key: 'preferredDate', label: 'Preferred Date' },
            ])}
          </TabsContent>

          <TabsContent value="advisory-sessions">
            {renderSubmissionTable(advisorySessions, 'advisory', [
              { key: 'fullName', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'sessionTopic', label: 'Topic' },
              { key: 'preferredDate', label: 'Preferred Date' },
            ])}
          </TabsContent>

          <TabsContent value="campus-invites">
            {renderSubmissionTable(campusInvites, 'campus-invite', [
              { key: 'fullName', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'institution', label: 'Institution' },
              { key: 'eventType', label: 'Event Type' },
            ])}
          </TabsContent>

          <TabsContent value="contact-general">
            {renderSubmissionTable(contactGeneral, 'contact', [
              { key: 'fullName', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'subject', label: 'Subject' },
              { key: 'message', label: 'Message' },
            ])}
          </TabsContent>

          <TabsContent value="contact-partnership">
            {renderSubmissionTable(contactPartnership, 'contact', [
              { key: 'fullName', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'subject', label: 'Subject' },
              { key: 'message', label: 'Message' },
            ])}
          </TabsContent>

          <TabsContent value="contact-corporate">
            {renderSubmissionTable(contactCorporate, 'contact', [
              { key: 'fullName', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'subject', label: 'Subject' },
              { key: 'message', label: 'Message' },
            ])}
          </TabsContent>

          <TabsContent value="contact-campus">
            {renderSubmissionTable(contactCampus, 'contact', [
              { key: 'fullName', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'subject', label: 'Subject' },
              { key: 'message', label: 'Message' },
            ])}
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isReplyOpen} onOpenChange={setIsReplyOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Reply</DialogTitle>
            <DialogDescription>
              Send an email reply to {replyData.recipientEmail}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Subject</Label>
              <Input
                value={replyData.subject}
                onChange={(e) => setReplyData({ ...replyData, subject: e.target.value })}
                placeholder="Enter subject"
                data-testid="input-reply-subject"
              />
            </div>
            <div>
              <Label>Message</Label>
              <Textarea
                value={replyData.body}
                onChange={(e) => setReplyData({ ...replyData, body: e.target.value })}
                placeholder="Enter your message..."
                className="min-h-[150px]"
                data-testid="input-reply-body"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReplyOpen(false)}>Cancel</Button>
            <Button onClick={sendReply} disabled={replyMutation.isPending} data-testid="button-send-reply">
              {replyMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
              Send Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingItem?.id ? 'Edit Item' : 'Add New Item'}</DialogTitle>
          </DialogHeader>
          <AdminItemForm
            activeTab={activeTab}
            editingItem={editingItem}
            onSubmit={(data) => {
              const type = activeTab;
              if (editingItem?.id) {
                updateMutation.mutate({ type, id: editingItem.id, data });
              } else {
                createMutation.mutate({ type, data });
              }
            }}
            isLoading={createMutation.isPending || updateMutation.isPending}
          />
        </DialogContent>
      </Dialog>
    </main>
  );
}

function AdminItemForm({ activeTab, editingItem, onSubmit, isLoading }: {
  activeTab: TabType;
  editingItem: any;
  onSubmit: (data: any) => void;
  isLoading: boolean;
}) {
  const [formData, setFormData] = useState(editingItem || {});

  useEffect(() => {
    setFormData(editingItem || {});
  }, [editingItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderFields = () => {
    switch (activeTab) {
      case 'resources':
        return (
          <>
            <div>
              <Label>Title *</Label>
              <Input
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Resource title"
                data-testid="input-title"
              />
            </div>
            <div>
              <Label>Description *</Label>
              <Textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Resource description"
                data-testid="input-description"
              />
            </div>
            <div>
              <Label>Category *</Label>
              <Input
                value={formData.category || ''}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., Guides, Templates, Tools"
                data-testid="input-category"
              />
            </div>
            <div>
              <Label>Link</Label>
              <Input
                value={formData.link || ''}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                placeholder="https://..."
                data-testid="input-link"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.isActive ?? true}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                data-testid="switch-active"
              />
              <Label>Active</Label>
            </div>
          </>
        );
      case 'programs':
        return (
          <>
            <div>
              <Label>Title *</Label>
              <Input
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Program title"
                data-testid="input-title"
              />
            </div>
            <div>
              <Label>Description *</Label>
              <Textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Program description"
                data-testid="input-description"
              />
            </div>
            <div>
              <Label>Category *</Label>
              <Input
                value={formData.category || ''}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., Accelerator, Bootcamp"
                data-testid="input-category"
              />
            </div>
            <div>
              <Label>Duration</Label>
              <Input
                value={formData.duration || ''}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g., 3 months"
                data-testid="input-duration"
              />
            </div>
            <div>
              <Label>Eligibility</Label>
              <Input
                value={formData.eligibility || ''}
                onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                placeholder="Who can apply"
                data-testid="input-eligibility"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.isActive ?? true}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                data-testid="switch-active"
              />
              <Label>Active</Label>
            </div>
          </>
        );
      case 'events':
        return (
          <>
            <div>
              <Label>Title *</Label>
              <Input
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Event title"
                data-testid="input-title"
              />
            </div>
            <div>
              <Label>Description *</Label>
              <Textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Event description"
                data-testid="input-description"
              />
            </div>
            <div>
              <Label>Date *</Label>
              <Input
                type="datetime-local"
                value={formData.date ? new Date(formData.date).toISOString().slice(0, 16) : ''}
                onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value) })}
                data-testid="input-date"
              />
            </div>
            <div>
              <Label>Location *</Label>
              <Input
                value={formData.location || ''}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Event location"
                data-testid="input-location"
              />
            </div>
            <div>
              <Label>Category *</Label>
              <Input
                value={formData.category || ''}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., Conference, Workshop"
                data-testid="input-category"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.isActive ?? true}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                data-testid="switch-active"
              />
              <Label>Active</Label>
            </div>
          </>
        );
      case 'membership-plans':
        return (
          <>
            <div>
              <Label>Name *</Label>
              <Input
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Plan name"
                data-testid="input-name"
              />
            </div>
            <div>
              <Label>Type *</Label>
              <Input
                value={formData.type || ''}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                placeholder="e.g., Basic, Premium"
                data-testid="input-type"
              />
            </div>
            <div>
              <Label>Price *</Label>
              <Input
                value={formData.price || ''}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="e.g., Free, $99/year"
                data-testid="input-price"
              />
            </div>
            <div>
              <Label>Description *</Label>
              <Textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Plan description"
                data-testid="input-description"
              />
            </div>
            <div>
              <Label>Order</Label>
              <Input
                type="number"
                value={formData.order || 0}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                data-testid="input-order"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.isActive ?? true}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                data-testid="switch-active"
              />
              <Label>Active</Label>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  if (!['resources', 'programs', 'events', 'membership-plans'].includes(activeTab)) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {renderFields()}
      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={isLoading} className="flex-1" data-testid="button-submit-form">
          {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
          {editingItem?.id ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
}
