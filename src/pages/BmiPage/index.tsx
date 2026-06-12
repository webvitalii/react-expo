import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageLayout from '@/components/PageLayout';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type UnitSystem = 'metric' | 'imperial';

const CATEGORY_KEYS = ['underweight', 'healthy', 'overweight', 'obesity'] as const;
type BMICategory = (typeof CATEGORY_KEYS)[number];

const CATEGORY_LABELS: Record<BMICategory, string> = {
  underweight: 'Underweight',
  healthy: 'Healthy',
  overweight: 'Overweight',
  obesity: 'Obesity',
};

const RANGE_LABELS: Record<BMICategory, string> = {
  underweight: 'Below 18.5',
  healthy: '18.5 – 24.9',
  overweight: '25.0 – 29.9',
  obesity: '30.0 or above',
};

const getBMICategory = (bmiValue: number): BMICategory => {
  if (bmiValue < 18.5) return 'underweight';
  if (bmiValue < 25) return 'healthy';
  if (bmiValue < 30) return 'overweight';
  return 'obesity';
};

// Spec: ./spec/README.md — read before changing this page
const BmiPage = () => {
  const { t } = useTranslation('bmi');
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

  return (
    <PageLayout title={t('title', 'Calculate Your BMI')}>
      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">{t('calculator.title', 'BMI Calculator')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs
              value={unitSystem}
              onValueChange={(value) => {
                if (value === 'metric' || value === 'imperial') setUnitSystem(value);
              }}
            >
              <TabsList className="w-full">
                <TabsTrigger value="metric">{t('calculator.tabs.metric', 'Metric')}</TabsTrigger>
                <TabsTrigger value="imperial">
                  {t('calculator.tabs.imperial', 'Imperial')}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="metric" className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="height" className="text-sm font-medium">
                    {t('calculator.height', 'Height')}
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
                      {t('calculator.centimeters', 'Centimeters')}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="weight" className="text-sm font-medium">
                    {t('calculator.weight', 'Weight')}
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
                      {t('calculator.kilograms', 'Kilograms')}
                    </span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="imperial" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('calculator.height', 'Height')}</label>
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
                    {t('calculator.weight', 'Weight')}
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
                      {t('calculator.pounds', 'Pounds')}
                    </span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-3 pt-2">
              <Button onClick={calculateBMI} className="flex-1">
                {t('calculator.calculate', 'Calculate Your BMI')}
              </Button>
              <Button onClick={handleReset} variant="outline">
                {t('calculator.reset', 'Reset')}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            {bmi !== null && (
              <div className="bg-primary text-primary-foreground text-center py-4 -mx-6 -mt-6 mb-4 rounded-t-xl">
                <div className="text-sm font-medium">{t('result.yourBmiIs', 'YOUR BMI IS')}</div>
                <div className="text-4xl font-bold mt-1">{bmi.toFixed(1)}</div>
              </div>
            )}
            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-semibold">{t('result.category', 'BMI Category')}</span>
              <span className="font-semibold">{t('result.range', 'BMI Range')}</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-0 p-0">
            {CATEGORY_KEYS.map((key, index) => {
              const isActive = bmi !== null && getBMICategory(bmi) === key;
              return (
                <div
                  key={key}
                  className={`flex justify-between items-center px-6 py-3 ${
                    isActive ? 'bg-muted/50' : ''
                  } ${index !== CATEGORY_KEYS.length - 1 ? 'border-b' : ''}`}
                >
                  <span className={isActive ? 'font-semibold' : ''}>
                    {t(`categories.${key}`, CATEGORY_LABELS[key])}
                  </span>
                  <span className={`text-muted-foreground ${isActive ? 'font-semibold' : ''}`}>
                    {t(`ranges.${key}`, RANGE_LABELS[key])}
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
