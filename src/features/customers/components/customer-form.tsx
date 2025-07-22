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
// import { useUserService } from "../service/usersService";
import { toast } from "sonner";

import { Label } from "@/components/ui/label";


import { useCustomerService } from "../services/customer-services";

interface CustomerFormProps {
  open: boolean;
  onClose: () => void;
  mode: "create" | "edit",
  userId: string | number;
}

const CustomerForm = ({ open, onClose, mode, userId }: CustomerFormProps) => {
      const isEdit = mode === "edit";
  const { createCustomer,updateCustomer, editCustomer } = useCustomerService();
  
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    roleIds: [] as (string | number)[],
  });

  
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
        await updateCustomer(form, userId);
        toast("User invite Succesfully");
      } else{
        await createCustomer(form);
        toast("User updated Succesfully");
      }      
      onClose();            
    } catch (err) {
      console.log(err);
      toast("User invite failed", { description: `${err}` });
    }
  };




    const fetchUser = async (id: (string | number | null)) => {
      try {
        const data  = await editCustomer(id ?? "");
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
            Create a new User
          </DialogTitle>
          <DialogDescription>
            An Email is required to create a new user.
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

        </form>
        <DialogFooter>
          <Button onClick={handleSubmit}>{isEdit ? "Update" :"Save"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CustomerForm