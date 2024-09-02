// import queryError from './query-error'
import registration from './registration.js'
import getGameplaySessionPlugin from './get-gameplay-session.js'
import startGamePlayListPlugin from './start-game-play-list.js'
import getActivityFilesPlugin from './activity-files.js'
import activityDeployVersionPlugin from './activity-deploy-version.js'
import activityDeleteVersionPlugin from './activity-delete-version.js'
import requestGameDemoPlugin from './request-game-demo.js'
import createNewLicensedAppUserPlugin from './create-new-licensed-app-user.js'
import upgradePatientLicensePlugin from './upgrade-patient-license.js'
import deactivateAppUserPlugin from './deactivate-user.js'
import reactivateAppUserPlugin from './reactivate-user.js'
import createSubsidiaryPlugin from './create-subsidiary.js'
import removeAppTenantPlugin from './remove-app-tenant.js'
import promoteUserToAdminPlugin from './promote-user-to-admin.js'
import demoteUserFromAdmin from './demote-user-from-admin.js'
import promoteUserToGameLanguageManagerPlugin from './promote-user-to-game-language-managaer.js'
import demoteUserFromGameLanguageManager from './demote-user-from-game-language-manager.js'
import promoteUserToAppTenantGroupAdminPlugin from './promote-user-to-app-tenant-group-administrator.js'
import demoteUserFromAppTenantGroupAdmin from './demote-user-from-app-tenant-group-admin.js'
import promoteUserToDemoAdminPlugin from './promote-user-to-demo-admin.js'
import demoteUserFromDemoAdmin from './demote-user-from-demo-admin.js'
import GameFileDeploymentsInfoPlugin from './game-file-deployments.js'
import requestActivityDeploymentToProdPlugin from './request-activity-deployment-to-prod.js'
import promoteUserToActivityDeveloperPlugin from './promote-user-to-activity-developer.js'
import demoteUserFromActivityDeveloperPlugin from './demote-user-from-activity-developer.js'
import removeUserFromAuth0Plugin from './remove-user-from-auth0.js'

// import requestPricingPlugin from './request-pricing'
import subscribeFromBrochurePlugin from './subscribe-from-brochure.js'
import contactFromBrochurePlugin from './contact-from-brochure.js'
import sendEmailPlugin from './send-email-plugin.js'
import queueWorkflowPlugin from './queue-workflow.js'
import sendPasswordChangeEmail from './send-password-change-email.js'
import AppUserAuth0InfoPlugin from './find-user-in-auth0.js'
import activityGetDevInfoPlugin from './activity-get-dev-info.js'
import changeUserEmail from './change-user-email.js'
import activityDeploymentJob from './activity-deployment-job.js'
import currentAppUserPlugin from './current-app-user.js'
import searchVideos from './search-sprout-videos.js'

export default [
  // queryError,
  registration,
  getGameplaySessionPlugin,
  startGamePlayListPlugin,
  getActivityFilesPlugin,
  activityDeployVersionPlugin,
  activityDeleteVersionPlugin,
  requestGameDemoPlugin,
  createNewLicensedAppUserPlugin,
  requestActivityDeploymentToProdPlugin,
  upgradePatientLicensePlugin,
  deactivateAppUserPlugin,
  reactivateAppUserPlugin,
  createSubsidiaryPlugin,
  removeAppTenantPlugin,
  // requestPricingPlugin,
  contactFromBrochurePlugin,
  subscribeFromBrochurePlugin,
  sendEmailPlugin,
  queueWorkflowPlugin,
  sendPasswordChangeEmail,
  AppUserAuth0InfoPlugin,
  GameFileDeploymentsInfoPlugin,
  activityGetDevInfoPlugin,
  changeUserEmail,
  promoteUserToAdminPlugin,
  demoteUserFromAdmin,
  promoteUserToGameLanguageManagerPlugin,
  demoteUserFromGameLanguageManager,
  promoteUserToAppTenantGroupAdminPlugin,
  demoteUserFromAppTenantGroupAdmin,
  promoteUserToDemoAdminPlugin,
  demoteUserFromDemoAdmin,
  activityDeploymentJob,
  promoteUserToActivityDeveloperPlugin,
  demoteUserFromActivityDeveloperPlugin,
  removeUserFromAuth0Plugin,
  searchVideos,
  currentAppUserPlugin
]