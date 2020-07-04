import React from "react";
import { Card, Feed, Grid } from 'semantic-ui-react';
import { IGlobal } from '../../apis/corona.api';

interface Props {
  global?: IGlobal;
}
export default function Summary(props: Props) {
  const { global } = props;

  if (!global) {
    return <></>
  }

  return (
    <Card color='blue' centered={true} fluid={true}>
      <Card.Content>
        <Card.Header>Mundial</Card.Header>
        <Card.Description>
          <Grid columns={2}>
            <Grid.Column>
              <Feed>
                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date content='Casos' />
                    <Feed.Summary>{global.NewConfirmed}</Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date content='Mortes' />
                    <Feed.Summary>{global.NewDeaths}</Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date content='Recuperações' />
                    <Feed.Summary>{global.NewRecovered}</Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
              </Feed>
            </Grid.Column>
            <Grid.Column>
              <Feed>
                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date content='Total Casos' />
                    <Feed.Summary>{global.TotalConfirmed}</Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date content='Total Mortes' />
                    <Feed.Summary>{global.TotalDeaths}</Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date content='Total Recuperações' />
                    <Feed.Summary>{global.TotalRecovered}</Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
              </Feed>
            </Grid.Column>
          </Grid>
        </Card.Description>
      </Card.Content>
    </Card >
  );
}