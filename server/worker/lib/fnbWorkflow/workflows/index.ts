import { upsertWorkflowProject, release } from './_upsert-workflow-project.js'

import wfWorkflowExerciser from './wf-workflow-exerciser.js'
// import wfWorkflowExerciserChcklist from './wf-workflow-exerciser-checklist'
import wfAuth0ActivateUser from './wf-auth0-activate-user.js'
import wfAuth0InviteUser from './wf-auth0-invite-user.js'
import wfAuth0DeactivateUser from './wf-auth0-deactivate-user.js'
import wfAuth0RectivateUser from './wf-auth0-reactivate-user.js'
import wfAuth0SendPasswordChangeEmail from './wf-auth0-send-password-change-email.js'
import wfAuth0SendInvitationEmail from './wf-auth0-send-invitation-email.js'
import wfAuth0SendWelcomeEmail from './wf-auth0-send-welcome-email.js'
import wfAuth0SyncUser from './wf-auth0-sync-user.js'
import wfAuth0ChangeUserEmail from './wf-auth0-change-user-email.js'
import wfBrochureContact from './wf-brochure-contact.js'
import wfBrochureSubscribe from './wf-brochure-subscribe.js'
import wfBrochureDemo from './wf-brochure-demo.js'
import wfDeployGame from './wf-ovb-deploy-game.js'
import wfAuth0RemoveUser from './wf-auth0-remove-user.js'

const workflows = [
  wfWorkflowExerciser,
  // wfWorkflowExerciserChcklist,
  wfAuth0ActivateUser,
  wfAuth0InviteUser,
  wfAuth0DeactivateUser,
  wfAuth0RectivateUser,
  wfAuth0SendPasswordChangeEmail,
  wfAuth0SendInvitationEmail,
  wfAuth0SendWelcomeEmail,
  wfBrochureContact,
  wfBrochureDemo,
  wfBrochureSubscribe,
  wfAuth0SyncUser,
  wfAuth0ChangeUserEmail,
  wfDeployGame,
  wfAuth0RemoveUser
]

async function upsertWorkflows () {
  for (const wf of workflows) {
    console.log('UPSERTING', wf.identifier)
    const result = await upsertWorkflowProject(wf)
    console.log('UPSERTED', result)
  }
  release()
}

export {upsertWorkflows}