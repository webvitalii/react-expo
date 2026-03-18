import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import PageTitle from '@/components/PageTitle';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const BmiPage = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    if (heightNum > 0 && weightNum > 0) {
      const heightInMeters = heightNum / 100;
      const bmiValue = weightNum / (heightInMeters * heightInMeters);
      setBmi(bmiValue);
    }
  };

  const getBMICategory = (bmiValue: number) => {
    if (bmiValue < 18.5) {
      return {
        category: 'Underweight',
        description:
          'You are below the healthy weight range. Consider consulting with a healthcare professional about a nutrition plan.',
        color: 'text-blue-600',
      };
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      return {
        category: 'Normal weight',
        description:
          'You are within the healthy weight range. Maintain your current lifestyle with a balanced diet and regular exercise.',
        color: 'text-green-600',
      };
    } else if (bmiValue >= 25 && bmiValue < 30) {
      return {
        category: 'Overweight',
        description:
          'You are above the healthy weight range. Consider incorporating more physical activity and reviewing your diet.',
        color: 'text-orange-600',
      };
    } else {
      return {
        category: 'Obese',
        description:
          "You are significantly above the healthy weight range. It's recommended to consult with a healthcare professional.",
        color: 'text-red-600',
      };
    }
  };

  return (
    <PageLayout>
      <PageTitle>BMI Calculator</PageTitle>

      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Calculate Your BMI</CardTitle>
            <CardDescription>
              Enter your height and weight to calculate your Body Mass Index
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="height" className="text-sm font-medium">
                Height (cm)
              </label>
              <Input
                id="height"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="weight" className="text-sm font-medium">
                Weight (kg)
              </label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={calculateBMI} className="flex-1">
                Calculate BMI
              </Button>
            </div>
          </CardContent>
        </Card>

        {bmi !== null && (
          <Card>
            <CardHeader>
              <CardTitle>Your Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{bmi.toFixed(1)}</div>
                <div className={`text-xl font-semibold ${getBMICategory(bmi).color}`}>
                  {getBMICategory(bmi).category}
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">{getBMICategory(bmi).description}</p>
              </div>

              <div className="space-y-2 text-sm">
                <h3 className="font-semibold">BMI Categories:</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Underweight: BMI &lt; 18.5</li>
                  <li>• Normal weight: BMI 18.5 - 24.9</li>
                  <li>• Overweight: BMI 25 - 29.9</li>
                  <li>• Obese: BMI ≥ 30</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  );
};

export default BmiPage;
