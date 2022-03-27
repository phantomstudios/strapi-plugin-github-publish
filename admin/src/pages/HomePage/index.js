import React, { useState, useEffect } from "react";

import { Box } from '@strapi/design-system/Box';
import { Button } from '@strapi/design-system/Button';
import { HeaderLayout, ContentLayout } from '@strapi/design-system/Layout';
import { Loader } from '@strapi/design-system/Loader';
import { Main } from '@strapi/design-system/Main';
import { Typography } from '@strapi/design-system/Typography';
import Upload from '@strapi/icons/Upload';
import { LoadingIndicatorPage, request } from "@strapi/helper-plugin";

import { useIntl } from 'react-intl';
import { getTrad } from '../../utils';

import pluginId from "../../pluginId";

const POLL_INTERVAL = 10000;

const HomePage = () => {
  const { formatMessage } = useIntl();

  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let timeout;
    const checkBusy = async () => {
      const { busy } = await request(`/${pluginId}/check`, { method: "GET" });

      setBusy(busy);
      setReady(true);

      timeout = setTimeout(checkBusy, POLL_INTERVAL);
    };

    checkBusy();

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const triggerPublish = async () => {
    setBusy(true);

    await request(`/${pluginId}/publish`, { method: "GET" });
  };

  const handleClick = () => {
    const ok = confirm(
      formatMessage({
        id: getTrad('home.prompt.confirm'),
        defaultMessage: 'Are you sure you wish to publish?',
      })
    );

    if (ok) triggerPublish();
  };

  if (!ready) return <LoadingIndicatorPage />;

  return (
    <Main>
      <HeaderLayout
        title={formatMessage({
          id: getTrad('home.title'),
          defaultMessage: 'Publishing',
        })}
        subtitle={formatMessage({
          id: getTrad('home.description'),
          defaultMessage: 'Publish changes to GitHub',
        })}
      />
      <ContentLayout>
        {busy ? (
          <>
            <Loader>Busy...</Loader>
            <Typography variant="omega">
              {formatMessage({
                id: getTrad('home.busy'),
                defaultMessage: 'The site is currently rebuilding, please wait.',
              })}
            </Typography>
          </>
        ) : (
          <>
            <Box paddingBottom={4}>
              <Typography variant="omega">
                {formatMessage({
                  id: getTrad('home.prompt'),
                  defaultMessage: 'Clicking the below button will trigger the site to rebuild with new content, are you sure?',
                })}
              </Typography>
            </Box>
            <Button startIcon={<Upload />} onClick={handleClick}>
              {formatMessage({
                id: getTrad('home.button.publish'),
                defaultMessage: 'Publish',
              })}
            </Button>
          </>
        )}
      </ContentLayout>
    </Main>
  );
};

export default HomePage;
