import { getCountries, getSummary } from './../../apis/corona.api';
import { observable, computed, action } from 'mobx';
import { ISummary, ICountry } from '../../apis/corona.api';
import { assign } from '../../utils/object.util';

export default class CoronaStore {
  @observable countryCode: string = '';
  @observable summary?: ISummary;
  @observable countries: ICountry[] = [];

  @computed get countriesFiltered() {
    return (this.summary?.Countries?.filter((x) => this.countryCode === '' || x.Country === this.countryCode))
  }

  @computed get countriesOptions() {
    return this.countries.sort((a, b) => {
      if (a.Country < b.Country) { return -1; }
      if (a.Country > b.Country) { return 1; }
      return 0;
    }).map((x, i) => {
      return {
        key: i,
        text: x.Country,
        value: x.Country,
      }
    });
  }

  @action handleForm = (event: any, select?: any) => {
    const { name, value } = select || event.target;
    assign(this, name, value);
  };

  @action getCountries = async () => {
    try {
      const { data } = await getCountries();
      this.countries = data;
    } catch (error) {
      this.countries = [];
    }
  };

  @action getSummary = async () => {
    try {
      const { data } = await getSummary();
      this.summary = data;
    } catch (error) {
      this.summary = undefined;
    }
  };

}
const corona = new CoronaStore();
export { corona };
