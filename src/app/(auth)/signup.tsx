import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {
  HeaderWithGoBack,
  RootWrapper,
  Button,
  FieldInput,
  FormContext,
} from '@/components';
import { useRouter } from 'expo-router';
import { useForm } from '@tanstack/react-form';
import { Icon, Hugeicons } from '@/icons';

type UserRole = 'client' | 'delivery' | null;

type SignupFormData = {
  // Common fields
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phone: string;

  // Client specific
  address?: string;
  city?: string;
  postalCode?: string;

  // Delivery specific
  vehicleType?: string;
  licenseNumber?: string;
  vehiclePlateNumber?: string;
};

type Step = 'role' | 'account' | 'personal' | 'details' | 'complete';

const CLIENT_STEPS: Step[] = ['role', 'account', 'personal', 'details', 'complete'];
const DELIVERY_STEPS: Step[] = ['role', 'account', 'personal', 'details', 'complete'];

export default function Signup() {
  const { replace } = useRouter();
  const [role, setRole] = useState<UserRole>(null);
  const [currentStep, setCurrentStep] = useState<Step>('role');
  const [formData, setFormData] = useState<Partial<SignupFormData>>({});

  const form = useForm<SignupFormData>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      vehicleType: '',
      licenseNumber: '',
      vehiclePlateNumber: '',
    },
  });

  const getSteps = (): Step[] => {
    return role === 'client' ? CLIENT_STEPS : DELIVERY_STEPS;
  };

  const getCurrentStepIndex = (): number => {
    return getSteps().indexOf(currentStep);
  };

  const canGoNext = (): boolean => {
    const stepIndex = getCurrentStepIndex();
    return stepIndex < getSteps().length - 1;
  };

  const canGoBack = (): boolean => {
    return getCurrentStepIndex() > 0;
  };

  const handleNext = async () => {
    if (!canGoNext()) return;

    const steps = getSteps();
    const nextStep = steps[getCurrentStepIndex() + 1];
    setCurrentStep(nextStep);
  };

  const handleBack = () => {
    if (!canGoBack()) return;

    const steps = getSteps();
    const prevStep = steps[getCurrentStepIndex() - 1];
    setCurrentStep(prevStep);

    if (prevStep === 'role') {
      setRole(null);
    }
  };

  const handleSubmit = async () => {
    const formValues = form.state.values;
    console.log('Signup data:', { role, ...formValues });
    // TODO: Implement actual signup with Convex auth
    setCurrentStep('complete');
  };

  const renderRoleSelection = () => (
    <View className="gap-4">
      <View className="mb-4">
        <Text className="mb-2 text-center text-2xl font-bold text-text dark:text-textdark">
          Join AlmaniaLink
        </Text>
        <Text className="text-center text-sm text-text/70 dark:text-textdark/70">
          Choose how you want to use our service
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          setRole('client');
          setCurrentStep('account');
        }}
        className="border-primary/30 bg-background active:border-primary active:opacity-70 flex-row items-center gap-4 rounded-2xl border-2 p-5 shadow-sm">
        <View className="bg-primary/20 h-14 w-14 items-center justify-center rounded-xl">
          <Icon
            icon={Hugeicons.UserIcon}
            size={28}
            className="text-primary"
            strokeWidth={2}
          />
        </View>
        <View className="flex-1">
          <Text className="text-lg font-semibold text-text dark:text-textdark">
            Client Account
          </Text>
          <Text className="text-sm text-text/70 dark:text-textdark/70">
            I want to receive packages and deliveries
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setRole('delivery');
          setCurrentStep('account');
        }}
        className="border-primary/30 bg-background active:border-primary active:opacity-70 flex-row items-center gap-4 rounded-2xl border-2 p-5 shadow-sm">
        <View className="bg-primary/20 h-14 w-14 items-center justify-center rounded-xl">
          <Icon
            icon={Hugeicons.Delivery01Icon}
            size={28}
            className="text-primary"
            strokeWidth={2}
          />
        </View>
        <View className="flex-1">
          <Text className="text-lg font-semibold text-text dark:text-textdark">
            Delivery Partner
          </Text>
          <Text className="text-sm text-text/70 dark:text-textdark/70">
            I want to deliver packages and earn
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderAccountStep = () => (
    <View className="gap-4">
      <Text className="mb-2 text-center text-xl font-bold text-text dark:text-textdark">
        Create your account
      </Text>
      <Text className="mb-4 text-center text-sm text-text/70 dark:text-textdark/70">
        Enter your email and create a password
      </Text>

      <FormContext value={form}>
        <FieldInput
          label="Email Address"
          name="email"
          placeholder="Enter your email"
          className="bg-background dark:bg-backgroundDark"
        />
        <FieldInput
          label="Password"
          name="password"
          placeholder="Create a password"
          password
          className="bg-background dark:bg-backgroundDark"
        />
        <FieldInput
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Confirm your password"
          password
          className="bg-background dark:bg-backgroundDark"
        />
      </FormContext>

      <View className="mt-2 rounded-xl bg-backgroundSecondary p-3">
        <Text className="mb-2 text-sm font-semibold text-text dark:text-textdark">
          Password requirements:
        </Text>
        <Text className="text-xs text-text/70 dark:text-textdark/70">
          • At least 8 characters long
        </Text>
        <Text className="text-xs text-text/70 dark:text-textdark/70">
          • Contains uppercase and lowercase letters
        </Text>
        <Text className="text-xs text-text/70 dark:text-textdark/70">
          • Contains at least one number
        </Text>
      </View>
    </View>
  );

  const renderPersonalStep = () => (
    <View className="gap-4">
      <Text className="mb-2 text-center text-xl font-bold text-text dark:text-textdark">
        Personal Information
      </Text>
      <Text className="mb-4 text-center text-sm text-text/70 dark:text-textdark/70">
        Tell us about yourself
      </Text>

      <FormContext value={form}>
        <FieldInput
          label="Full Name"
          name="fullName"
          placeholder="Enter your full name"
          className="bg-background dark:bg-backgroundDark"
        />
        <FieldInput
          label="Phone Number"
          name="phone"
          placeholder="Enter your phone number"
          className="bg-background dark:bg-backgroundDark"
        />
      </FormContext>
    </View>
  );

  const renderClientDetailsStep = () => (
    <View className="gap-4">
      <Text className="mb-2 text-center text-xl font-bold text-text dark:text-textdark">
        Delivery Address
      </Text>
      <Text className="mb-4 text-center text-sm text-text/70 dark:text-textdark/70">
        Where should we deliver your packages?
      </Text>

      <FormContext value={form}>
        <FieldInput
          label="Street Address"
          name="address"
          placeholder="Enter your street address"
          className="bg-background dark:bg-backgroundDark"
        />
        <FieldInput
          label="City"
          name="city"
          placeholder="Enter your city"
          className="bg-background dark:bg-backgroundDark"
        />
        <FieldInput
          label="Postal Code"
          name="postalCode"
          placeholder="Enter your postal code"
          className="bg-background dark:bg-backgroundDark"
        />
      </FormContext>
    </View>
  );

  const renderDeliveryDetailsStep = () => (
    <View className="gap-4">
      <Text className="mb-2 text-center text-xl font-bold text-text dark:text-textdark">
        Vehicle Information
      </Text>
      <Text className="mb-4 text-center text-sm text-text/70 dark:text-textdark/70">
        Tell us about your delivery vehicle
      </Text>

      <FormContext value={form}>
        <View className="gap-2">
          <Text className="font-medium text-text dark:text-textdark">
            Vehicle Type
          </Text>
          <View className="flex-row gap-2">
            {['Bicycle', 'Motorcycle', 'Car', 'Van'].map(type => (
              <TouchableOpacity
                key={type}
                onPress={() => form.setFieldValue('vehicleType', type)}
                className={`flex-1 rounded-xl border-2 p-3 ${
                  form.state.values.vehicleType === type
                    ? 'border-primary bg-primary/20'
                    : 'border-backgroundSecondary bg-background'
                }`}>
                <Text
                  className="text-center text-sm font-medium text-text dark:text-textdark">
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <FieldInput
          label="Driver's License Number"
          name="licenseNumber"
          placeholder="Enter your license number"
          className="bg-background dark:bg-backgroundDark"
        />
        <FieldInput
          label="Vehicle Plate Number"
          name="vehiclePlateNumber"
          placeholder="Enter your plate number"
          className="bg-background dark:bg-backgroundDark"
        />
      </FormContext>
    </View>
  );

  const renderDetailsStep = () => {
    if (role === 'client') {
      return renderClientDetailsStep();
    }
    return renderDeliveryDetailsStep();
  };

  const renderCompleteStep = () => (
    <View className="items-center gap-6">
      <View className="bg-primary/20 h-24 w-24 items-center justify-center rounded-full">
        <Icon
          icon={Hugeicons.CheckCircleIcon}
          size={48}
          className="text-primary"
          strokeWidth={2}
        />
      </View>

      <View className="items-center">
        <Text className="mb-2 text-center text-2xl font-bold text-text dark:text-textdark">
          Account Created!
        </Text>
        <Text className="text-center text-sm text-text/70 dark:text-textdark/70">
          Your {role} account has been successfully created.
        </Text>
      </View>

      <View className="w-full gap-3">
        <Button
          label="Go to Login"
          onPress={() => replace('/login')}
          className="w-full"
        />
      </View>
    </View>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 'role':
        return renderRoleSelection();
      case 'account':
        return renderAccountStep();
      case 'personal':
        return renderPersonalStep();
      case 'details':
        return renderDetailsStep();
      case 'complete':
        return renderCompleteStep();
      default:
        return null;
    }
  };

  const renderStepIndicator = () => {
    if (currentStep === 'role' || currentStep === 'complete') return null;

    const steps = getSteps().filter(s => s !== 'role' && s !== 'complete');
    const currentIndex = steps.indexOf(currentStep);

    return (
      <View className="mb-6 flex-row items-center justify-center gap-2">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <View
              className={`h-2 rounded-full ${
                index <= currentIndex ? 'bg-primary' : 'bg-backgroundSecondary'
              }`}
              style={{ width: 32 }}
            />
            {index < steps.length - 1 && (
              <View
                className={`h-0.5 flex-1 ${
                  index < currentIndex ? 'bg-primary' : 'bg-backgroundSecondary'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </View>
    );
  };

  return (
    <RootWrapper className="px-4">
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={10}
        className="flex-1">
        <ScrollView
          className="flex-1"
          contentContainerClassName="flex-1"
          bounces={false}>
          {currentStep !== 'role' && <HeaderWithGoBack />}

          <View className="bg-backgroundSecondary dark:bg-backgroundSecondaryDark min-h-[70vh] rounded-2xl p-5">
            {renderStepIndicator()}

            {currentStep === 'complete' ? (
              renderCompleteStep()
            ) : (
              <>
                {renderStep()}

                {currentStep !== 'role' && (
                  <View className="mt-6 gap-3">
                    {canGoBack() && (
                      <TouchableOpacity
                        onPress={handleBack}
                        className="items-center rounded-xl p-3">
                        <Text className="font-semibold text-primary">Back</Text>
                      </TouchableOpacity>
                    )}

                    {canGoNext() ? (
                      <Button
                        label="Continue"
                        onPress={handleNext}
                        className="w-full"
                      />
                    ) : (
                      <Button
                        label="Create Account"
                        onPress={handleSubmit}
                        className="w-full"
                      />
                    )}
                  </View>
                )}
              </>
            )}
          </View>

          <Text className="mt-4 text-center text-sm text-text dark:text-textdark">
            Already have an account?{' '}
            <Text
              onPress={() => replace('/login')}
              className="font-semibold text-primary">
              Sign In
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </RootWrapper>
  );
}
