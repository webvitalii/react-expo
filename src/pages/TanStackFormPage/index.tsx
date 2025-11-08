import { useForm } from '@tanstack/react-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';
import PageLayout from '@/components/PageLayout';
import PageTitle from '@/components/PageTitle';
import { Label } from '@/components/ui/label';

const TanStackFormPage = () => {
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      username: '',
      email: '',
      gender: '',
      bio: '',
      agree: false,
      notifications: 'all' as 'all' | 'mentions' | 'none',
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      toast({
        title: 'You submitted the following values:',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(value, null, 2)}</code>
          </pre>
        ),
      });
    },
  });

  return (
    <PageLayout>
      <PageTitle>TanStack Form with validation</PageTitle>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-8"
      >
        {/* Username Field */}
        <form.Field
          name="username"
          validators={{
            onBlur: ({ value }) =>
              value.length < 2
                ? 'Username must be at least 2 characters.'
                : undefined,
          }}
        >
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Username</Label>
              <Input
                id={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                This is your public display name.
              </p>
              {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                <p className="text-sm font-medium text-destructive">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Email Field */}
        <form.Field
          name="email"
          validators={{
            onBlur: ({ value }) =>
              !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                ? 'Please enter a valid email address.'
                : undefined,
          }}
        >
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Email</Label>
              <Input
                id={field.name}
                type="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                We'll never share your email with anyone else.
              </p>
              {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                <p className="text-sm font-medium text-destructive">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Gender Select Field */}
        <form.Field
          name="gender"
          validators={{
            onBlur: ({ value }) => {
              if (!value || value.length === 0) {
                return 'Select a gender.';
              }
              if (!['male', 'female', 'other'].includes(value)) {
                return 'Invalid gender selection.';
              }
              return undefined;
            },
          }}
        >
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Gender</Label>
              <Select
                value={field.state.value}
                onValueChange={(value) => field.handleChange(value)}
              >
                <SelectTrigger id={field.name} onBlur={field.handleBlur}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">Select your gender.</p>
              {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                <p className="text-sm font-medium text-destructive">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Bio Textarea Field */}
        <form.Field
          name="bio"
          validators={{
            onBlur: ({ value }) => {
              if (value.length < 10) {
                return 'Bio must be at least 10 characters.';
              }
              if (value.length > 100) {
                return 'Bio must not be longer than 100 characters.';
              }
              return undefined;
            },
          }}
        >
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Bio</Label>
              <Textarea
                id={field.name}
                className="resize-none"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Tell us a little bit about yourself.
              </p>
              {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                <p className="text-sm font-medium text-destructive">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Notifications Radio Group Field */}
        <form.Field
          name="notifications"
          validators={{
            onBlur: ({ value }) =>
              !['all', 'mentions', 'none'].includes(value)
                ? 'Invalid notification preference.'
                : undefined,
          }}
        >
          {(field) => (
            <div className="space-y-3">
              <Label>Notification Preferences</Label>
              <RadioGroup
                value={field.state.value}
                onValueChange={(value) =>
                  field.handleChange(value as 'all' | 'mentions' | 'none')
                }
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all" className="font-normal">
                    All notifications
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mentions" id="mentions" />
                  <Label htmlFor="mentions" className="font-normal">
                    Mentions only
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="none" />
                  <Label htmlFor="none" className="font-normal">
                    None
                  </Label>
                </div>
              </RadioGroup>
              <p className="text-sm text-muted-foreground">
                Choose how you want to receive notifications.
              </p>
              {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                <p className="text-sm font-medium text-destructive">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Agree Checkbox Field */}
        <form.Field
          name="agree"
          validators={{
            onBlur: ({ value }) =>
              !value ? 'You must agree to the terms of service.' : undefined,
          }}
        >
          {(field) => (
            <div>
              <div className="flex flex-row items-start space-x-3 space-y-0">
                <Checkbox
                  id={field.name}
                  checked={field.state.value}
                  onCheckedChange={(checked) =>
                    field.handleChange(checked as boolean)
                  }
                />
                <div className="space-y-1 leading-none">
                  <Label htmlFor={field.name}>Accept terms and conditions</Label>
                  <p className="text-sm text-muted-foreground">
                    You must agree to the terms of service.
                  </p>
                </div>
              </div>
              {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                <p className="text-sm font-medium text-destructive mt-2">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Subscribe
          selector={(state) => ({
            canSubmit: state.canSubmit,
            isSubmitting: state.isSubmitting,
          })}
        >
          {({ canSubmit, isSubmitting }) => (
            <Button type="submit" disabled={!canSubmit || isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </PageLayout>
  );
};

export default TanStackFormPage;
