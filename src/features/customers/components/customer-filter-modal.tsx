import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import React, { useState } from 'react'

interface UserFilterModalProps {
    open: boolean;
    onClose: () => void;  
    onApply: (filters: Record<string, string>) => void;
  }

const CustomerFilterModal = ({open,onClose,onApply}: UserFilterModalProps) => {
          const [localFilters, setLocalFilters] = useState({
            name: "",
            description: "",
          });
        
          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setLocalFilters((prev) => ({...prev,[e.target.name]: e.target.value,}));
          };
        
          const handleSubmit = () => {onApply(localFilters);};
  return (
        <Sheet open={open} onOpenChange={onClose}>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Filters for: Roles</SheetTitle>
        <SheetDescription>
          See results in your view based on filters you select here.
        </SheetDescription>
      </SheetHeader>
      <div className="grid gap-4 m-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">First name</Label>
          <Input id="name" className="col-span-3" value={localFilters.name} onChange={handleChange} placeholder="John"/>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">Last name</Label>
          <Input id="description" className="col-span-3" value={localFilters.description} onChange={handleChange} placeholder="wick"/>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">Email</Label>
          <Input id="description" className="col-span-3" value={localFilters.description} onChange={handleChange} placeholder="abc@gmail.com"/>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">Phone No</Label>
          <Input id="description" className="col-span-3" value={localFilters.description} onChange={handleChange} placeholder="+91-8778171938"/>
        </div>
      </div>
      <SheetFooter>        
        <Button variant="outline" className="h-8 px-2 lg:px-3 me-1" onClick={onClose}>Cancel</Button>
          <Button type="submit" onSubmit={handleSubmit}>Apply filters</Button>        
      </SheetFooter>
    </SheetContent>
  </Sheet>
  )
}

export default CustomerFilterModal