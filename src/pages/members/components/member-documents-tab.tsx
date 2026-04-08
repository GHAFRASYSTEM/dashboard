import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { FileText, Upload } from 'lucide-react'

export function MemberDocumentsTab() {
  return (
    <Card className="border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Documents</CardTitle>
        <Button size="sm" variant="outline">
          <Upload className="mr-2 size-4" />
          Upload
        </Button>
      </CardHeader>

      <CardContent>
        <div className="py-12 text-center">
          <FileText className="mx-auto mb-4 size-12 text-muted-foreground" />
          <h3 className="mb-2 text-lg font-semibold">No documents yet</h3>
          <p className="mb-4 text-muted-foreground">
            Upload member documents like ID, certificates, etc.
          </p>
          <Button variant="outline">
            <Upload className="mr-2 size-4" />
            Upload Document
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}