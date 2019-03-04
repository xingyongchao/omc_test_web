import { combine, uniformProxy } from '../../common/helpers/util'
import env from '../../../server/env'

export default function (router) {
  router.get('/client/getInitFilterInfo', async function (ctx) {
    const { query, querystring } = ctx;
    let { filterId, solutionId, viewId } = query;
    const promises = [];
    promises.push(uniformProxy({
      url: combine(env.HTTP_SERVICE_BASEURL, `/filterDesign/getFilterBase?${querystring}`),
      method: 'GET'
    }));
    promises.push(uniformProxy({
      url: combine(env.HTTP_SERVICE_BASEURL, `/filterDesign/getSolutionList?${querystring}`),
      method: 'POST',
      params: { filterId }
    }));
    const results = [];
    for (let i = 0, len = promises.length; i < len; i++)
      results.push(await promises[i]);
    if (results[1].code === 200 && results[1].data && results[1].data.length) {
      const defaultSolution = results[1].data.find(item => {
        return item.isDefault;
      });
      if (!solutionId)
        solutionId = defaultSolution && defaultSolution.id || results[1].data[0].id;
    }
    solutionId = solutionId || 999;
    if (solutionId) {
      const config = {
        url: combine(env.HTTP_SERVICE_BASEURL, `/filter/${solutionId}/solutionFilters?${querystring}&solutionid=${solutionId}${viewId && `&viewid=${viewId}`}`),
        method: 'GET'
      };
      results.push(await uniformProxy(config));
    }
    ctx.body = { code: 200, data: results };
  });
}
