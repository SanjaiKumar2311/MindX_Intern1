
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRoleService } from "../service/rolesService";
import { toast } from "sonner";
import type { Permissions } from "../service/rolesService";

interface RoleFormProps {
  mode: "create" | "edit";
  roleId?: number;
}

const RoleForm = ({mode, roleId}: RoleFormProps) => {

  const navigate = useNavigate();
  // const { roleId } = useParams<{ roleId?: string }>();

  const isEdit = mode === "edit";
  const {editRole, createRole, updateRole} = useRoleService();

   const [form, setForm] = useState({
      name: '',
      description: '',
      permissions: [] as Permissions[], 
    });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {      
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: '' });
  };

  const validate = () => {
    const errors: Record<string, string> = {}
    if (!form.name) errors.name = 'Role name is required'
    return errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      
    const errors = validate();
    if(Object.keys(errors).length > 0){
      setFieldErrors(errors);
      return;
    }
    console.log(form);
    
    try{
      if(roleId){
        await updateRole(form, Number(roleId))
      } else {        
        await createRole(form);
      }
      navigate(`/settings/roles`);
    } catch (err) {      
      console.log(err);
      
      toast("role  failed", {         
        description: `${err}`,        
      });
    }
    
  };

  const updatePermission = (
    index: number,
    field: keyof Permissions,
    value: boolean
  ) => {
    const updatedPermissions = [...form.permissions];
    updatedPermissions[index] = {
      ...updatedPermissions[index],
      [field]: value,
    };
    setForm({ ...form, permissions: updatedPermissions });
  };
  
  const fetchRole = async (id: (string | number | null)) => {
    try {
      const data  = await editRole(id ?? "");
      console.log(data);

      setForm({
          name: data.name || '',
          description: data.description || '',
          permissions: data.permissions || [],
        });
      
    } catch (err) {
      console.error("Error fetching roles", err);
    }
  };

  useEffect(() => {
      fetchRole(roleId ?? null);
    }, [roleId]);

    

  return (
    <div>
      <>
        <div className="flex flex-1 flex-col">
          <div className="flex-none"> <h3 className="text-lg font-medium">Role</h3></div>
          <Separator className="my-4 flex-none" />          
          <div className="-mx-1 px-1.5 lg:max-w-xl">
            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Role Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Role Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="admin" 
                  value={form.name}
                  onChange={handleChange}
                />
                {fieldErrors.name && <p className="text-sm text-red-500">{fieldErrors.name}</p>}                                
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Max.500 characters"
                  value={form.description}
                  onChange={handleChange}
                  className="resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Permissions</Label>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Permission</TableHead>
                        <TableHead className="border">Full Access</TableHead>
                        <TableHead className="border">View</TableHead>
                        <TableHead className="border">Create</TableHead>
                        <TableHead className="border">Edit</TableHead>
                        <TableHead className="border">Delete</TableHead>
                        <TableHead className="">More</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {form.permissions.map((permission, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium border">{permission.entityType}</TableCell>                          
                          <TableCell className="text-center font-medium border">
                            <Checkbox 
                              checked={permission.fullAccess}
                              onCheckedChange={(checked) => updatePermission(index, "fullAccess", !!checked)}
                            />
                          </TableCell>
                          <TableCell className="text-center font-medium border">
                            <Checkbox 
                              checked={permission.canView}
                              onCheckedChange={(checked) => updatePermission(index, "canView", !!checked)}
                            />
                          </TableCell>
                          <TableCell className="text-center font-medium border">
                            <Checkbox 
                              checked={permission.canCreate}
                              onCheckedChange={(checked) => updatePermission(index, "canCreate", !!checked)}
                            />
                          </TableCell>
                          <TableCell className="text-center font-medium border">
                            <Checkbox 
                              checked={permission.canEdit}
                              onCheckedChange={(checked) => updatePermission(index, "canEdit", !!checked)}
                            />
                          </TableCell>
                          <TableCell className="text-center font-medium border">
                            <Checkbox 
                              checked={permission.canDelete}
                              onCheckedChange={(checked) => updatePermission(index, "canDelete", !!checked)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Submit Button &&  Cancel Button  */}
              <Button type="submit">{isEdit ? "Update":"Save"}</Button>              
              <Button variant="outline" type="button" className="ms-2">Cancel</Button>
            </form>
          </div>
          
        </div>
      </>
    </div>
  );
};

export default RoleForm;
