import React, { memo, useState, useEffect, useRef } from "react";

import { Button, Padded, Text } from "@buffetjs/core";
import { Header } from "@buffetjs/custom";
import { LoadingBar } from "@buffetjs/styles";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContext, request } from "strapi-helper-plugin";

import pluginId from "../../pluginId";

const HomePage = () => {
  const { formatMessage } = useGlobalContext();
  const checkTimeout = useRef();
  const [checkNumber, setCheckNumber] = useState(0);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const checkBusy = async () => {
      const { busy } = await request(`/${pluginId}/check`, { method: "GET" });

      setBusy(busy);
      setReady(true);

      checkTimeout.current = setTimeout(() => {
        setCheckNumber(checkNumber + 1);
      }, 5000);
    };

    checkBusy();

    return () => {
      clearTimeout(checkTimeout.current);
    };
  }, [checkNumber, setCheckNumber]);

  const triggerPublish = async () => {
    setBusy(true);
    clearTimeout(checkTimeout.current);

    const { success } = await request(`/${pluginId}/publish`, {
      method: "GET",
    });

    if (success) {
      setTimeout(() => {
        setCheckNumber(checkNumber + 1);
      }, 20000);
    }
  };

  const handleClick = () => {
    const ok = confirm(
      formatMessage({ id: "github-publish.home.prompt.confirm" })
    );
    if (ok) triggerPublish();
  };

  return (
    <Padded size="md" top left bottom right>
      <Header
        title={{ label: formatMessage({ id: "github-publish.home.title" }) }}
        content={formatMessage({ id: "github-publish.home.description" })}
      />
      {ready ? (
        busy ? (
          <>
            <LoadingBar />
            <Text>{formatMessage({ id: "github-publish.home.busy" })}</Text>
          </>
        ) : (
          <>
            <Padded size="md" bottom>
              <Text>{formatMessage({ id: "github-publish.home.prompt" })}</Text>
            </Padded>
            <Button
              color="primary"
              icon={<FontAwesomeIcon icon={faUpload} />}
              onClick={handleClick}
            >
              {formatMessage({ id: "github-publish.home.button.publish" })}
            </Button>
          </>
        )
      ) : (
        <>
          <LoadingBar />
          <Text>{formatMessage({ id: "github-publish.home.notready" })}</Text>
        </>
      )}
    </Padded>
  );
};

export default memo(HomePage);
