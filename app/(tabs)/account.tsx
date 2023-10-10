import React, { useEffect } from "react";
import AccountSection from "../../components/account/AccountSection";
import { useAuth } from "../../utils/context/AuthContext";
import useUser from "../../utils/fetches/userData";
import RegisteredSection from "../../components/account/RegisteredSection";
import LoadingView from "../../components/LoadingView";
import { Text, View } from "react-native";
import useOrg from "../../utils/fetches/useOrg";
import RegisteredSectionOrg from "../../components/account/RegisteredSectionOrg";

export default function Account() {
  const { authState } = useAuth();
  const { sessionUser: user, error, isLoading } = useUser();
  const {
    sessionUser: org,
    error: isOrgError,
    isLoading: isOrgLoading,
  } = useOrg();

  return authState?.authenticated ? (
    authState.type === "user" ? (
      isLoading ? (
        <LoadingView />
      ) : error ? (
        <Text>{JSON.stringify(error)}</Text>
      ) : (
        <RegisteredSection user={user} />
      )
    ) : isOrgLoading ? (
      <LoadingView />
    ) : isOrgError ? (
      <Text>{JSON.stringify(error)}</Text>
    ) : (
      <RegisteredSectionOrg user={org} />
    )
  ) : (
    <AccountSection />
  );
}
