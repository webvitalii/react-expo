import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import PageTitle from '@/components/PageTitle';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type UnitSystem = 'metric' | 'imperial';

const BmiPage = () => {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  const [heightCm, setHeightCm] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [feet, setFeet] = useState<string>('5');
  const [inches, setInches] = useState<string>('6');
  const [weightLbs, setWeightLbs] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    let bmiValue = 0;

    if (unitSystem === 'metric') {
      const heightNum = parseFloat(heightCm);
      const weightNum = parseFloat(weightKg);

      if (heightNum > 0 && weightNum > 0) {
        const heightInMeters = heightNum / 100;
        bmiValue = weightNum / (heightInMeters * heightInMeters);
      }
    } else {
      const feetNum = parseInt(feet);
      const inchesNum = parseInt(inches);
      const weightNum = parseFloat(weightLbs);

      if (feetNum > 0 && weightNum > 0) {
        const totalInches = feetNum * 12 + inchesNum;
        bmiValue = (weightNum / (totalInches * totalInches)) * 703;
      }
    }

    if (bmiValue > 0) {
      setBmi(bmiValue);
    }
  };

  const handleReset = () => {
    setHeightCm('');
    setWeightKg('');
    setFeet('5');
    setInches('6');
    setWeightLbs('');
    setBmi(null);
  };

  const getBMICategory = (bmiValue: number): string => {
    if (bmiValue < 18.5) return 'Underweight';
    if (bmiValue < 25) return 'Healthy';
    if (bmiValue < 30) return 'Overweight';
    return 'Obesity';
  };

  const bmiCategories = [
    { name: 'Underweight', range: 'Below 18.5' },
    { name: 'Healthy', range: '18.5 – 24.9' },
    { name: 'Overweight', range: '25.0 – 29.9' },
    { name: 'Obesity', range: '30.0 or above' },
  ];

  return (
    <PageLayout>
      <PageTitle>Calculate Your BMI</PageTitle>

      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">BMI CALCULATOR</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant={unitSystem === 'imperial' ? 'outline' : 'default'}
                onClick={() => setUnitSystem('metric')}
                className="flex-1"
              >
                Metric
              </Button>
              <Button
                variant={unitSystem === 'metric' ? 'outline' : 'default'}
                onClick={() => setUnitSystem('imperial')}
                className="flex-1"
              >
                Imperial
              </Button>
            </div>

            {unitSystem === 'metric' ? (
              <>
                <div className="space-y-2">
                  <label htmlFor="height" className="text-sm font-medium">
                    Height
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id="height"
                      type="number"
                      value={heightCm}
                      onChange={(e) => setHeightCm(e.target.value)}
                      className="flex-1"
                    />
                    <span className="flex items-center text-sm text-muted-foreground min-w-[100px]">
                      Centimeters
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="weight" className="text-sm font-medium">
                    Weight
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id="weight"
                      type="number"
                      value={weightKg}
                      onChange={(e) => setWeightKg(e.target.value)}
                      className="flex-1"
                    />
                    <span className="flex items-center text-sm text-muted-foreground min-w-[100px]">
                      Kilograms
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Height</label>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Select value={feet} onValueChange={(value) => value && setFeet(value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[3, 4, 5, 6, 7, 8].map((f) => (
                            <SelectItem key={f} value={f.toString()}>
                              {f}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1">
                      <Select value={inches} onValueChange={(value) => value && setInches(value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="weight-lbs" className="text-sm font-medium">
                    Weight
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id="weight-lbs"
                      type="number"
                      value={weightLbs}
                      onChange={(e) => setWeightLbs(e.target.value)}
                      className="flex-1"
                    />
                    <span className="flex items-center text-sm text-muted-foreground min-w-[100px]">
                      Pounds
                    </span>
                  </div>
                </div>
              </>
            )}

            <div className="flex gap-3 pt-2">
              <Button onClick={calculateBMI} className="flex-1">
                Calculate Your BMI
              </Button>
              <Button onClick={handleReset} variant="outline">
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            {bmi !== null && (
              <div className="bg-primary text-primary-foreground text-center py-4 -mx-6 -mt-6 mb-4 rounded-t-xl">
                <div className="text-sm font-medium">YOUR BMI IS</div>
                <div className="text-4xl font-bold mt-1">{bmi.toFixed(1)}</div>
              </div>
            )}
            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-semibold">BMI Category</span>
              <span className="font-semibold">BMI Range</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-0 p-0">
            {bmiCategories.map((category, index) => {
              const isActive = bmi !== null && getBMICategory(bmi) === category.name;
              return (
                <div
                  key={category.name}
                  className={`flex justify-between items-center px-6 py-3 ${
                    isActive ? 'bg-muted/50' : ''
                  } ${index !== bmiCategories.length - 1 ? 'border-b' : ''}`}
                >
                  <span className={isActive ? 'font-semibold' : ''}>{category.name}</span>
                  <span className={`text-muted-foreground ${isActive ? 'font-semibold' : ''}`}>
                    {category.range}
                  </span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default BmiPage;
