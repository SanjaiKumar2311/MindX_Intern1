import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { useUserService } from "../service/usersService";
import { toast } from "sonner";
import { Check, ChevronsUpDown, MailPlus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useRoleService } from "@/features/rolesnew/service/rolesService";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

interface InviteUser {
  open: boolean;
  onClose: () => void;
  mode: "create" | "edit",
  userId: string | number;
}
interface Role {
  id: string;
  name: string;
}
const InviteUser = ({ open, onClose, mode, userId }: InviteUser) => {
  const isEdit = mode === "edit";
  const { inviteUser,updateUser, editUser } = useUserService();
  const { getAllRole } = useRoleService();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    roleIds: [] as (string | number)[],
  });

  const [roles, setRoles] = useState<Role[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!form.firstName) errors.firstName = "First name is required";
    if (!form.lastName) errors.lastName = "Last name is required";
    if (!form.email) errors.email = "Email is required";
    if (form.roleIds.length === 0)
      errors.roleIds = "Atleast one role is required";
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    console.log(form);
    
    try {
      if(userId){
        await updateUser(form, userId);
        toast("User invite Succesfully");
      } else{
        await inviteUser(form);
        toast("User updated Succesfully");
      }      
      onClose();            
    } catch (err) {
      console.log(err);
      toast("User invite failed", { description: `${err}` });
    }
  };

  const fetchRoles = async (
    params: Record<string, string | number | boolean>
  ) => {
    try {
      const { content } = await getAllRole(params);
      console.log(content);
      setRoles(content);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  useEffect(() => {
    if(open) {
        const params = { pagesize: 100 };
        fetchRoles(params);
    }
  }, [open]);
  const [openn, setOpenn] = React.useState(false);

  const toggleRole = (roleId: string | number) => {
    console.log(roleId);

    const updated = form.roleIds.includes(roleId)
      ? form.roleIds.filter((id) => id !== roleId)
      : [...form.roleIds, roleId];

    setForm({ ...form, roleIds: updated });
    setFieldErrors((prev) => ({ ...prev, roleIds: "" }));
  };

  const selectedLabels = roles
    .filter((r) => form.roleIds.includes(r.id))
    .map((r) => r.name)
    .join(", ");

    const fetchUser = async (id: (string | number | null)) => {
      try {
        const data  = await editUser(id ?? "");
        console.log(data);
  
        setForm({
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: data.email || '',
            roleIds: data.roleIds ||  [],
          });
        
      } catch (err) {
        console.error("Error fetching roles", err);
      }
    };

      useEffect(() => {
        fetchUser(userId ?? null);
        }, [userId]);
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-left">
          <DialogTitle className="flex items-center gap-2">
            <MailPlus /> Invite User
          </DialogTitle>
          <DialogDescription>
            Invite new user to join your team by sending them an email
            invitation. Assign a role to define their access level.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4">
          <div className="grid gap-2 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                name="firstName"
                type="text"
                placeholder="First Name"
                onChange={handleChange}
                value={form.firstName}
              />
              {fieldErrors.firstName && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldErrors.firstName}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                name="lastName"
                type="text"
                placeholder="Last Name"
                onChange={handleChange}
                value={form.lastName}
              />
              {fieldErrors.lastName && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldErrors.lastName}
                </p>
              )}
            </div>
          </div>
          <div className="grid gap-2 ">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john.doe@gmail.com"
            />
            {fieldErrors.email && (
              <p className="text-sm text-red-500 mt-1">{fieldErrors.email}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="roles">Roles</Label>

            <Popover open={openn} onOpenChange={setOpenn}>
              <PopoverTrigger asChild className="w-full">
                <Button
                  variant="outline"
                  // className="w-full justify-between"
                  className="w-full justify-between h-10 overflow-hidden text-ellipsis whitespace-nowrap"
                  role="combobox"
                >
                  {selectedLabels || "Select roles"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                sideOffset={4}
                className="w-full max-w-full p-2 space-y-1 bg-popover border border-border rounded-md shadow-md max-h-60 overflow-y-auto z-50"
              >
                {roles.map((role) => (
                  <div
                    key={role.id}
                    onClick={() => toggleRole(role.id)}
                    className={cn(
                      "flex items-center justify-between px-2 py-1 rounded-md cursor-pointer",
                      "hover:bg-muted transition-colors"
                    )}
                  >
                    <span>{role.name}</span>
                    <Check
                      className={cn(
                        "h-4 w-4",
                        form.roleIds.includes(role.id)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </div>
                ))}
              </PopoverContent>
            </Popover>
            {fieldErrors.roleIds && (
              <p className="text-sm text-red-500 mt-1">{fieldErrors.roleIds}</p>
            )}
          </div>
        </form>
        <DialogFooter>
          <Button onClick={handleSubmit}>{isEdit ? "Update" :"Save"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InviteUser;
