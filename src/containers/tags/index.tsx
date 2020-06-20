import * as React from 'react';
import { Container, Grid, Header, Form } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import NewRouterStore from '../../mobx/router.store';
import tagsStore from './store';

interface Props {
  router: NewRouterStore;
  tags: tagsStore;
}

@inject('router', 'tags')
@observer
export default class Tags extends React.Component<Props> {

  render() {

    const { image, video, getLocationGPS, geoLocale, getStream } = this.props.tags;

    return (
      <Container>
        <Grid divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header color='blue' as='h2'>
                <Header.Content>
                  Tags
                 <Header.Subheader>Um pouco de HTML5 &#128512;</Header.Subheader>
                </Header.Content>
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Form>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Video</label>
              {video && <video src={video} muted={true} controls={true} autoPlay={true} />}
            </Form.Field>
            <Form.Field>
              <label>Imagem</label>
              {image && <img height={200} alt='imagem' src={image} />}
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Youtube</label>
              <iframe title='Youtube' width="420" height="315"
                src="https://www.youtube.com/embed/tgbNymZ7vqY">
              </iframe>
            </Form.Field>
            <Form.Field>
              <button onClick={() => getLocationGPS()}>Pegar Coordenadas</button>
              <p>{geoLocale}</p>
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <p><button type="button" onClick={() => getStream('video')}>Ativar Web Cam</button></p>
              <video id='webcam' controls autoPlay={true} style={{ height: '180px', width: '240px' }}></video>
            </Form.Field>
          </Form.Group>
        </Form>
      </Container >
    );
  }
}
