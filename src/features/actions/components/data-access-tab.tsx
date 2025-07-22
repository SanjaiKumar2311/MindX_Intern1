
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ResponseField {
    id: string
    responsePath: string
    description: string
    example: string
    value: string
}
interface Props {
    form: {
        responseFields: ResponseField[];
    };
    // onChange: (form: any) => void;
    
  }

const DataAccessTab = ({form} : Props) => {
    // const updateInput = (index: number,field: keyof ResponseField,value: string) => {
    //     const updatedInputs = [...form.responseFields];
    //     updatedInputs[index] = { ...updatedInputs[index], [field]: value };
    //     onChange({ ...form, responseFields: updatedInputs });
    //   };
    //   const addInputRow = () => {
    //     const newInputs = [...form.responseFields,{ name: "", description: "", format: "text" },];
    //     onChange({ ...form, responseFields: newInputs });
    //   };
  return (
    <div className="space-y-8">
    <div className="space-y-2">
      <div className="grid gap-1.5 leading-none">
        <Label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Use API outputs in chat (Optional)
        </Label>
        <p className="text-sm text-muted-foreground">
        Choose info from the API response for your AI Agent to reference in chat and other Actions. Use JMESPath syntax. If no outputs are set, this Action will still work but the response data won’t be used.
        </p>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Data</TableHead>
              <TableHead className="w-[620px]">Test Response</TableHead>                          
            </TableRow>
          </TableHeader>
          <TableBody>
          {(form.responseFields.length > 0? form.responseFields: [{ responsePath: "", description: "", example: "", value: "" }]).map((res, idx) => (
            <TableRow key={idx}>
              <TableCell className="text-center font-medium">
                <Input 
                placeholder="order_number" 
                value={res.responsePath} 
                // onChange={(e) => updateInput(idx, "responsePath", e.target.value)}
                />
              </TableCell>
              <TableCell className="text-center font-medium ">
                <Input 
                placeholder="8-digit order number that ends with 0" 
                value={res.value} 
                // onChange={(e) => updateInput(idx, "value", e.target.value)}
                />
              </TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* <Button variant="outline" type="button" onClick={addInputRow}>+ Add</Button> */}
    </div>  
  </div>
  )
}

export default DataAccessTab