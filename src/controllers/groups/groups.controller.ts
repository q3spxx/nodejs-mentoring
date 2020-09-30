import express from 'express';
import { groupsService } from '@services';
import { groupByIdValidator, groupPostValidator, groupPutByIdValidator } from './groups.validators';
import { ValidatedRequest } from 'express-joi-validation';
import { GroupByIdSchema, GroupPostSchema, GroupPutByIdSchema } from './groups.types';
import { getErrorResponseHandler } from '@helpers/errors';

const groupsController = express.Router();

groupsController
    .route('/groups')
    .get((_, res) => {
        groupsService
            .getAllGroups()
            .then((data: GroupDTO[]) => res.json(data))
            .catch(getErrorResponseHandler(res));
    })
    .post(groupPostValidator, ({ body }: ValidatedRequest<GroupPostSchema>, res) => {
        groupsService
            .createGroup(body)
            .then((data: GroupDTO) => res.json(data))
            .catch(getErrorResponseHandler(res));
    });

groupsController
    .route('/groups/:id')
    .all(groupByIdValidator)
    .get(({ params: { id } }: ValidatedRequest<GroupByIdSchema>, res) => {
        groupsService
            .getGroup(id)
            .then((data: GroupDTO) => res.json(data))
            .catch(getErrorResponseHandler(res));
    })
    .put(groupPutByIdValidator, ({ params: { id }, body }: ValidatedRequest<GroupPutByIdSchema>, res) => {
        groupsService
            .updateGroup({ id, ...body })
            .then((data: GroupDTO[]) => res.json(data))
            .catch(getErrorResponseHandler(res));
    })
    .delete(({ params: { id } }: ValidatedRequest<GroupByIdSchema>, res) => {
        groupsService
            .deleteGroup(id)
            .then((data: number) => res.json(data))
            .catch(getErrorResponseHandler(res));
    });

export { groupsController };
