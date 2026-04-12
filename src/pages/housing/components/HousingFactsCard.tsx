import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Separator } from '../../../components/ui/separator';
import type { Housing } from '../types/housing';

interface Props { housing: Housing }

export function HousingFactsCard({ housing }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        {[
          { label: 'Type',      value: housing.type },
          { label: 'City',      value: housing.city },
          { label: 'Bedrooms',  value: String(housing.bedrooms) },
          { label: 'Bathrooms', value: String(housing.bathrooms) },
          { label: 'Size',      value: `${housing.size} m²` },
          { label: 'Monthly',   value: `€${housing.price.toLocaleString()}` },
        ].map(({ label, value }, i, arr) => (
          <>
            <div key={label} className="flex justify-between">
              <span className="text-muted-foreground">{label}</span>
              <span className="font-medium">{value}</span>
            </div>
            {i < arr.length - 1 && <Separator key={`sep-${i}`} />}
          </>
        ))}

        {/* Extra charges */}
        {housing.charges.length > 0 && (
          <>
            <Separator />
            <p className="font-medium text-muted-foreground">Additional Charges</p>
            {housing.charges.map((c, i) => (
              <div key={i} className="flex justify-between text-xs">
                <span className="text-muted-foreground">{c.label}</span>
                <span className="font-medium">€{c.amount}</span>
              </div>
            ))}
          </>
        )}
      </CardContent>
    </Card>
  );
}