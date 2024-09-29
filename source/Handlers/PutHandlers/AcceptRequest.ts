import { RequestCRUD } from '../../../database/Middleware/Request';
import { UserCRUD } from '../../../database/Middleware/User';
import { Catchable } from '../../../library/Decorators/Catchable';
import { Checkable } from '../../../library/Decorators/Checkable';
import { MissingHeaders } from '../../../library/Errors/Params';
import {
  Handler,
  IHasChecks,
  ServerEvent
} from '../../../library/Interfaces/HandlerController';
import { RequestStatus } from '../../../library/Validators/Request';
import { sendRequestAcceptedEmail } from '../../Middleware/Email';

@Checkable
export class AcceptRequest extends Handler<ServerEvent> implements IHasChecks {
  constructor(event: ServerEvent) {
    super(event);
  }

  checkHeaders(): void {
    const requiredHeaders = ['requestId'];

    requiredHeaders.forEach((header) => {
      if (!this.event.req.headers[header]) {
        throw new MissingHeaders(`${header} not provided`, [header]);
      }
    });
  }

  @Catchable()
  runChecks(): Promise<void> {
    this.checkHeaders();

    return new Promise<void>((resolve) => {
      resolve();
    });
  }

  @Catchable()
  async execute(): Promise<void> {
    const reqId = this.event.req.headers.requestId as string;

    const req = await RequestCRUD.updateRequestStatus(
      reqId,
      RequestStatus.ACCEPTED
    );
    const receiver = await UserCRUD.getUserById(req!.createdFor.toString());

    this.event.res.status(200).send('Request accepted');

    await sendRequestAcceptedEmail(
      receiver!.name,
      receiver!.email,
      req!.title,
      req!.description,
      new Date().toDateString()
    );
  }
}
