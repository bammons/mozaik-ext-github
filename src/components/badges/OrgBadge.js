import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GithubIcon from 'react-icons/lib/fa/github-alt'
import {
    TrapApiError,
    Widget,
    WidgetLabel,
    WidgetHeader,
    WidgetBody,
    WidgetLoader,
    WidgetAvatar,
    ExternalLink,
} from '@mozaik/ui'

export default class OrgBadge extends Component {
    static propTypes = {
        organization: PropTypes.string.isRequired,
        title: PropTypes.string,
        apiData: PropTypes.shape({}),
        apiError: PropTypes.object,
    }

    static getApiRequest({ organization }) {
        return {
            id: `github.organization.${organization}`,
            params: { organization },
        }
    }

    render() {
        const { organization, title, apiData: orgInfo, apiError } = this.props

        let body = <WidgetLoader />
        if (orgInfo) {
            body = (
                <div
                    style={{
                        padding: '1.6vmin',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'stretch',
                        alignContent: 'stretch',
                        flexDirection: 'column',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <div
                        style={{
                            height: '40%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <ExternalLink href={orgInfo.html_url}>
                            <WidgetAvatar size="7vmin">
                                <img src={orgInfo.avatar_url} alt={this.props.organization} />
                            </WidgetAvatar>
                        </ExternalLink>
                    </div>
                    <div
                        style={{
                            padding: '2vmin',
                            textAlign: 'center',
                        }}
                    >
                        {orgInfo.description}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                        }}
                    >
                        <WidgetLabel
                            label={
                                <ExternalLink href={`${orgInfo.html_url}`}>
                                    public repos
                                </ExternalLink>
                            }
                            prefix={orgInfo.public_repos}
                            style={{ width: '48%', marginBottom: '1vmin' }}
                        />
                        <WidgetLabel
                            label="public gists"
                            prefix={orgInfo.public_gists}
                            style={{ width: '48%', marginBottom: '1vmin' }}
                        />
                        <WidgetLabel
                            label="followers"
                            prefix={orgInfo.followers}
                            style={{ width: '48%', marginBottom: '1vmin' }}
                        />
                        <WidgetLabel
                            label="following"
                            prefix={orgInfo.following}
                            style={{ width: '48%', marginBottom: '1vmin' }}
                        />
                    </div>
                </div>
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || 'organization'}
                    subject={title ? null : organization}
                    icon={GithubIcon}
                />
                <WidgetBody>
                    <TrapApiError error={apiError}>{body}</TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
