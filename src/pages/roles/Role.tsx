import RoleForm from "@/features/rolesnew/components/role-form";
import { useParams } from "react-router-dom";

const Role = () => {
  const { roleId } = useParams();
  return(<div className="p-6">
    <RoleForm 
    mode={roleId ? "edit" : "create"}
    roleId={roleId ? Number(roleId) : undefined} 
  />
  </div>) ;  
};

export default Role;
