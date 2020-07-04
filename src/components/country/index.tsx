import React from "react";
import { Card, Grid, Feed } from 'semantic-ui-react';
import { ICountry } from '../../apis/corona.api';

interface Props {
  country: ICountry;
}
export default function Country(props: Props) {
  const { country } = props;
  return (
    <Card color='red' centered={true} fluid={true}>
      <Card.Content>
        <Card.Header>{country.Country}</Card.Header>
        <Card.Description>
          <Grid columns={2}>
            <Grid.Column>
              <Feed>
                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date content='Casos' />
                    <Feed.Summary>{country.NewConfirmed}</Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date content='Mortes' />
                    <Feed.Summary>{country.NewDeaths}</Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date content='Recuperações' />
                    <Feed.Summary>{country.NewRecovered}</Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
              </Feed>
            </Grid.Column>
            <Grid.Column>
              <Feed>
                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date content='Total Casos' />
                    <Feed.Summary>{country.TotalConfirmed}</Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date content='Total Mortes' />
                    <Feed.Summary>{country.TotalDeaths}</Feed.Summary>
                  </Feed.Content>
                </Feed.Event>
                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date content='Total Recuperações' />
                    <Feed.Summary>{country.TotalRecovered}</Feed.Summary>
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